import { useActionState, useContext, useEffect, useState } from "react";
import { DataContext } from "../context/contextProvider";

export default function SideBar() {
  const {
    setShowSideBar,
    showSideBar,
    setShowAnswer,
    setCardsCollection,
    setCurrentProgress,
    setActiveCardDeckId,
    setNotification,
  } = useContext(DataContext);
  const [count, setCount] = useState([crypto.randomUUID()]);

  const [state, dispatchAction, isPending] = useActionState(
    handleAddCardCollection,
    {},
  );

  function handleAddCardCollection(prevData, formData) {
    if (!formData) throw new Error("No Form Data");

    if (!formData.get("deck-name").trim()) {
      setNotification({ message: "No Deck Name", show: true, type: "error" });

      return setTimeout(() => {
        setNotification({
          message: "",
          show: false,
          type: "error",
        });
      }, 2500);
    } else if (
      !formData.get("card-0-face")?.trim() ||
      !formData.get("card-0-back")?.trim()
    ) {
      setNotification({
        message: "Please fill all cards Info",
        show: true,
        type: "error",
      });

      return setTimeout(() => {
        setNotification({
          message: "",
          show: false,
          type: "error",
        });
      }, 2500);
    }

    const newCollectionId = crypto.randomUUID();

    const newCollection = {
      id: newCollectionId,
      name: formData?.get("deck-name"),
      cardContent: count.map((id, ind) => ({
        id,
        question: formData?.get(`card-${ind}-face`),
        answer: formData?.get(`card-${ind}-back`),
      })),
    };

    setShowAnswer(false);
    setActiveCardDeckId(newCollectionId);
    setCardsCollection((curr) => [...curr, newCollection]);
    setCurrentProgress(1);
    setCount((curr) => [curr[0]]);
    setNotification({
      message: `Deck ${formData?.get("deck-name")} added`,
      show: true,
      type: "success",
    });

    setTimeout(() => {
      setNotification({
        message: "",
        show: false,
        type: 'success',
      });
    }, 2500);

    return { newCollection, formData };
  }

  useEffect(() => {
    function handleClick(e) {
      if (e.target.closest(".aside") || e.target.classList.contains("aside"))
        return;

      setShowSideBar(false);
    }

    document.body.addEventListener("click", handleClick);

    return () => document.body.removeEventListener("click", handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSideBar]);

  return (
    <aside
      className={`aside fixed right-0 top-0 bottom-0 z-30 p-5 py-7 content-start bg-[#fafafa] w-[max(34dvw,310px)] transition-[translate] duration-200 ease-in-out ${showSideBar ? "translate-x-0" : "translate-x-[105%]"}`}
    >
      <form
        action={dispatchAction}
        className="flex flex-col gap-8 h-full"
      >
        <header className="flex justify-between items-center flex-wrap content-center">
          <button
            className="cursor-pointer p-1 hover:bg-zinc-300/30 transition-colors rounded-xl"
            type="button"
            onClick={() => setShowSideBar(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" />
            </svg>
          </button>

          <h2 className="text-lg leading-[normal]">Add custom deck</h2>
        </header>

        <main className="grid gap-4 overflow-auto py-2">
          <input
            type="text"
            required
            placeholder="Deck name"
            name="deck-name"
            className="w-[95%] mx-auto focus:ring-4 focus:ring-blue-500 focus:outline-0 p-2 px-3 border border-zinc-600/70 rounded-lg"
          />

          {count.map((num, ind) => (
            <CardInputs
              key={num}
              count={ind + 1}
            />
          ))}

          <div className="w-[95%] mx-auto flex gap-4 *:grow mt-7 *:flex *:gap-1 *:items-center *:justify-center">
            <button
              className="p-2 border border-blue-400/80 rounded-lg cursor-pointer transition-colors hover:bg-blue-400/80"
              type="button"
              onClick={() => setCount((curr) => [...curr, crypto.randomUUID()])}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
              Add card
            </button>

            <button
              className="p-2 border border-rose-400/80 rounded-lg cursor-pointer transition-colors hover:bg-rose-400/80 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent disabled:hover:bg-transparent"
              disabled={count.length === 1}
              type="button"
              onClick={() =>
                setCount((curr) => [
                  ...curr.filter((v, ind) => ind !== curr.length - 1),
                ])
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
              Delete card
            </button>
          </div>
        </main>

        <div className="flex gap-2 *:grow w-full mt-auto *:cursor-pointer *:max-h-fit *:rounded-md *:border *:transition-colors *:p-2">
          <button
            className="border-emerald-400/80 hover:bg-emerald-400/80 disabled:hover:bg-transparent disabled:opacity-40 origin-bottom"
            disabled={isPending}
          >
            Add Deck
          </button>

          <button
            className="border-red-400/80 hover:bg-red-400/80"
            onClick={() => setCount((curr) => [curr[0]])}
            type="button"
          >
            Delete all cards
          </button>
        </div>
      </form>
    </aside>
  );
}

function CardInputs({ count }) {
  return (
    <div className="animate-op grid gap-4">
      <hr className="w-[95%] mx-auto" />

      <span className="text-start">{count} -</span>

      <input
        type="text"
        name={`card-${count - 1}-face`}
        placeholder="Card face"
        required
        className="w-[95%] mx-auto focus:ring-4 focus:ring-blue-500 focus:outline-0 p-2 px-3 border border-zinc-600/70 rounded-lg"
      />

      <input
        type="text"
        name={`card-${count - 1}-back`}
        placeholder="Card Back"
        required
        className="w-[95%] mx-auto focus:ring-4 focus:ring-blue-500 focus:outline-0 p-2 px-3 border border-zinc-600/70 rounded-lg"
      />
    </div>
  );
}
