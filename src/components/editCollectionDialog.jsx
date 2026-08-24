import { useContext, useId, useState, useEffect, useRef } from "react";
import { DataContext } from "../context/contextProvider";

export default function Dialog() {
  const {
    editMenuObj,
    cardsCollection,
    setCardsCollection,
    setShowDialog,
    showDialog,
    setNotification,
  } = useContext(DataContext);

  const dialogRef = useRef(null);

  const clickedCollection = cardsCollection?.find(
    (deck) => deck?.id === editMenuObj?.id,
  );

  const [draftCards, setDraftCards] = useState(
    clickedCollection?.cardContent ?? [],
  );

  const inpts = Array.from(
    dialogRef?.current?.querySelectorAll("input") ?? [],
  ).filter((inp) => !inp?.value?.trim());

  useEffect(() => {
    if (clickedCollection) {
      setDraftCards(clickedCollection.cardContent);
    }
  }, [clickedCollection]);

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;

    if (showDialog && !node.open) {
      node.showModal();
    } else if (!showDialog && node.open) {
      node.close();
    }
  }, [showDialog]);

  if (!clickedCollection) return null;

  function updateCard(cardId, field, newValue) {
    setDraftCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, [field]: newValue } : card,
      ),
    );
  }

  function handleClose() {
    setDraftCards(clickedCollection.cardContent);
    dialogRef.current
      .querySelectorAll("input")
      .forEach((inp) => inp.nextElementSibling.classList.add("opacity-0"));
    setShowDialog(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (inpts.length) {
      inpts[0]?.focus();
      return inpts?.forEach((inp) =>
        inp?.nextElementSibling.classList.remove("opacity-0"),
      );
    }

    setCardsCollection((prev) =>
      prev.map((deck) =>
        deck.id === clickedCollection.id
          ? { ...deck, cardContent: draftCards }
          : deck,
      ),
    );

    setShowDialog(false);
    setNotification({
      message: `Successfully Updated  ${clickedCollection?.name}  Deck.`,
      show: true,
      type: "success",
    });

    setTimeout(() => {
      setNotification({
        message: `Successfully Updated  ${clickedCollection?.name}  Deck.`,
        show: false,
        type: "success",
      });
    }, 1000);

    return dialogRef.current
      .querySelectorAll("input")
      .forEach((inp) => inp.nextElementSibling.classList.add("opacity-0"));
  }

  return (
    <dialog
      ref={dialogRef}
      className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/40 backdrop:backdrop-blur-sm transition-[scale,opacity] p-6 rounded-2xl shadow-xl w-full max-w-md bg-white"
      onClose={handleClose}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold leading-none">Deck Info</h3>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close dialog"
            className="cursor-pointer text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
          {draftCards.map((card) => (
            <Inputs
              key={card.id}
              faceValue={card.question}
              backValue={card.answer}
              onFaceChange={(val) => updateCard(card.id, "question", val)}
              onBackChange={(val) => updateCard(card.id, "answer", val)}
            />
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-zinc-200">
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer px-4 py-2 rounded-lg border-2 border-zinc-300 hover:bg-zinc-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors"
          >
            Save changes
          </button>
        </div>
      </form>
    </dialog>
  );
}

function Inputs({ faceValue, backValue, onFaceChange, onBackChange }) {
  const id = useId();

  return (
    <div className="grid gap-3 border border-zinc-200 rounded-xl p-3">
      <div className="flex flex-col gap-1">
        <label
          htmlFor={`${id}-face`}
          className="text-sm font-medium text-zinc-600"
        >
          Card face
        </label>
        <input
          type="text"
          id={`${id}-face`}
          value={faceValue}
          onChange={(e) => onFaceChange(e.target.value)}
          className="focus:ring-4 focus:outline-0 ring-blue-700/30 p-2 rounded-lg border-2 border-zinc-300"
        />
        <span className="text-red-500 text-xs indent-1 opacity-0 transition-opacity duration-200">
          Please Fill Out This Field
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor={`${id}-back`}
          className="text-sm font-medium text-zinc-600"
        >
          Card back
        </label>
        <input
          type="text"
          id={`${id}-back`}
          value={backValue}
          onChange={(e) => onBackChange(e.target.value)}
          className="focus:ring-4 focus:outline-0 ring-blue-700/30 p-2 rounded-lg border-2 border-zinc-300"
        />
        <span className="text-red-500 duration-200 text-xs indent-1 opacity-0 transition-opacity">
          Please Fill Out This Field
        </span>
      </div>
    </div>
  );
}
