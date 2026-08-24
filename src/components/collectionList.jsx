import { useContext, useEffect, useRef } from "react";
import { DataContext } from "../context/contextProvider";

export default function CollectionList({ show, setShowMenu, menuRef }) {
  const { cardsCollection, editMenuObj, setEditObjMenu } =
    useContext(DataContext);

  useEffect(() => {
    function closeListOnClickOutSide(e) {
      if (
        (show && e.target.closest(".select")) ||
        e.target.classList.contains("select") ||
        (editMenuObj.opened &&
          (e.target.classList.contains("edit-menu") ||
            e.target.closest(".edit-menu")))
      )
        return;

      setShowMenu(() => false);
      setEditObjMenu((curr) => ({ ...curr, opened: false }));
    }

    document.body.addEventListener("click", closeListOnClickOutSide);

    return () =>
      document.body.removeEventListener("click", closeListOnClickOutSide);
    //
  }, [show, setEditObjMenu, setShowMenu, editMenuObj.opened]);

  return (
    <ul
      className={`menu absolute top-[110%] left-0 w-full bg-[#fafafa] rounded-lg grid border border-zinc-600/50 right-0 opacity-0 scale-90 origin-top-right transition-[opacity,scale] pointer-events-none [&.active]:scale-100 [&.active]:opacity-100 [&.active]:pointer-events-auto overflow-hidden ${show ? "active" : ""}`}
    >
      {cardsCollection?.map((co) => (
        <CardCollectionItem
          key={co.id}
          dataId={co.id}
          menuRef={menuRef}
        >
          {co.name}
        </CardCollectionItem>
      ))}
      {!cardsCollection.length && <li className="p-2">No Decks yet</li>}
    </ul>
  );
}

function CardCollectionItem({ dataId, children, menuRef }) {
  const timeout = useRef();
  const {
    setActiveCardDeckId,
    activeCardDeckId,
    setCurrentProgress,
    setShowAnswer,
    editMenuObj,
    setEditObjMenu,
  } = useContext(DataContext);

  function handleClick(e) {
    if (
      dataId === activeCardDeckId ||
      e.target.classList.contains("edit") ||
      e.target.closest(".edit")
    )
      return;

    console.log("Another Id Pressed", dataId);
    setActiveCardDeckId(dataId);
    setCurrentProgress(1);
    setShowAnswer(false);
    setEditObjMenu((curr) => ({ ...curr, opened: false }));
  }

  function handleMenuCLick(e) {
    if (editMenuObj.id === dataId)
      setEditObjMenu((curr) => ({ ...curr, opened: !curr.opened }));
    else {
      const clickedLiRect = e.target.closest(".li")?.getBoundingClientRect();
      const prevLiRect = document
        .querySelector(`.li[data-id='${editMenuObj.id}']`)
        ?.getBoundingClientRect();

      if (editMenuObj.id && menuRef?.current) {
        requestAnimationFrame(() => {
          menuRef.current.style.translate = `103% calc(58% + ${clickedLiRect?.top - prevLiRect?.top}px)`;

          if (timeout?.current) clearTimeout(timeout.current);

          timeout.current = setTimeout(() => {
            menuRef.current.style.transition = "none";
            menuRef.current.style.translate = "103% 58%";
            setEditObjMenu(() => ({ id: dataId, opened: true }));

            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  menuRef.current.style.transition = "";
                });
              });
            });
          }, 205);
        });
      } else {
        setEditObjMenu(() => ({ id: dataId, opened: true }));
      }
    }
  }

  return (
    <li
      onClick={handleClick}
      role="option"
      key={dataId}
      data-id={dataId}
      className={`li p-2 py-2.5 text-md leading-[normal] transition-colors hover:bg-zinc-300 duration-200 flex items-center justify-between`}
    >
      <span className="max-w-[90%] truncate">{children}</span>
      <button
        aria-label="Edit Collection"
        onClick={handleMenuCLick}
        className="edit cursor-pointer"
        style={{ anchorName: "--anc-" + dataId }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
        >
          <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
        </svg>
      </button>
    </li>
  );
}

export function EditOptions({ collectionId, openState, menuRef }) {
  const {
    setCardsCollection,
    cardsCollection,
    activeCardDeckId,
    setActiveCardDeckId,
    setEditObjMenu,
    setNotification,
    setShowDialog,
  } = useContext(DataContext);

  function handleClick() {
    const collectionInd = cardsCollection?.findIndex(
      (col) => col?.id === collectionId,
    );
    if (!collectionId || collectionInd < 0) {
      console.log(
        "active Coll ID: ",
        activeCardDeckId,
        "\nClicked Id: ",
        collectionId,
      );

      throw new Error("Cannot Find Collection With This ID");
    }

    if (collectionId === activeCardDeckId) {
      if (cardsCollection.length === 1) {
        setNotification({
          message: `deleted ${cardsCollection[collectionInd]?.name}`,
          show: true,
          type: "info",
        });

        setTimeout(() => {
          setNotification(() => ({ message: ``, show: false, type: "info" }));
        }, 2500);

        setCardsCollection([]);
      } else {
        const nextCollectionId = cardsCollection?.find(
          (coll) => coll?.id !== collectionId,
        )?.id;
        console.log("Next Collection ID: ", nextCollectionId);

        setActiveCardDeckId(nextCollectionId);
        setCardsCollection((curr) =>
          curr?.filter((coll) => coll?.id !== collectionId),
        );
        setEditObjMenu(() => ({ id: nextCollectionId, opened: false }));
      }
    } else {
      setCardsCollection((curr) =>
        curr.filter((coll) => coll.id !== collectionId),
      );
      setEditObjMenu((curr) => ({ ...curr, opened: false }));
    }
  }
  return (
    <div
      ref={menuRef}
      className={`edit-menu grid overflow-hidden bg-zinc-200 border border-zinc-700/40 absolute transition-[scale,opacity,translate] rounded-lg duration-200 ${openState ? "scale-100 opacity-100 pointer-events-auto" : "scale-90 opacity-0 pointer-events-none"} *:p-2 *:cursor-pointer *:transition-colors *:hover:bg-zinc-300`}
      style={{ positionAnchor: "--anc-" + collectionId }}
    >
      <button onClick={() => setShowDialog(true)}>Edit deck</button>
      <button onClick={handleClick}>Delete deck</button>
    </div>
  );
}
