import { useContext, useMemo, useRef, useState } from "react";
import CollectionList, { EditOptions } from "./collectionList";
import { DataContext } from "../context/contextProvider";

export default function CardsCollectionHolder() {
  const [showMenu, setShowMenu] = useState(false);
  const {
    activeCardDeskId,
    cardsCollection,
    showOnHover,
    setShowOnHover,
    setShowSideBar,
    editMenuObj,
    setEditObjMenu,
  } = useContext(DataContext);

  const menuRef = useRef();

  const activeDeckName = useMemo(
    () => cardsCollection.find((co) => co.id === activeCardDeskId).name,
    [activeCardDeskId, cardsCollection],
  );

  function handleClick(e) {
    if (
      e.target.closest(".menu") ||
      e.target.classList.contains("menu") ||
      e.target.closest(".edit-menu") ||
      e.target.classList.contains("edit-menu")
    )
      return;

    setShowMenu((currState) => !currState);
    if (editMenuObj.opened) setEditObjMenu(curr => ({...curr, opened: false}));
  }

  return (
    <div className="absolute right-[4%] top-[5%] flex flex-row-reverse gap-4 min-w-max z-10">
      <button
        className="fancy-btn cursor-pointer bg-blue-800 text-white p-2 rounded-lg"
        onClick={() => setShowSideBar(true)}
        tabIndex={0}
      >
        Create custom cards
      </button>

      <div
        className="select p-2 px-3 border border-zinc-600/70 cursor-pointer rounded-lg relative flex items-center content-center gap-1"
        onClick={handleClick}
        tabIndex={0}
        role="menu"
      >
        <span className="absolute -top-2.5 bg-white rounded-full text-xs px-1 left-2 max-w-25 truncate">
          {activeDeckName}
        </span>
        <span className="font-medium">Select cards deck</span>
        <span>
          <svg
            className={`${showMenu ? "rotate-180 translate-y-0.5 translate-x-0.5" : "rotate-0"} transition-[rotate,translate] duration-200`}
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 20 20"
            fill="none"
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chevron-down-icon lucide-chevron-down"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
        <CollectionList
          show={showMenu}
          setShowMenu={setShowMenu}
          menuRef={menuRef}
        />
        <EditOptions
          collectionId={editMenuObj.id}
          openState={editMenuObj.opened}
          menuRef={menuRef}
        />
      </div>

      <button
        className={`flip-on-hover flex gap-2 items-center border border-zinc-800/60 p-2 rounded-lg transition-colors cursor-pointer ${showOnHover ? "bg-blue-400" : ""}`}
        onClick={() => setShowOnHover((curr) => !curr)}
      >
        Flip card on hover
      </button>
    </div>
  );
}
