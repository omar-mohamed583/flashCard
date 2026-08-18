import { useState } from "react";
import CollectionList from "./collectionList";

export default function CardsCollectionHolder() {
  const [showMenu, setShowMenu] = useState(false);

  function handleClick(e) {
    if (e.target.closest('.menu') || e.target.classList.contains('menu')) return;

    setShowMenu(currState => !currState);
  }

  return (
    <div className="absolute right-[4%] top-[5%] flex flex-row-reverse gap-4 min-w-max z-10">
      <button
        className="fancy-btn cursor-pointer bg-blue-800 text-white p-2 rounded-lg"
        onClick={() => null}
      >
        Create custom cards
      </button>

      <div
        className="select p-2 px-3 border border-zinc-600/70 cursor-pointer rounded-lg relative flex"
        onClick={handleClick}
      >
        <span className="font-medium">Select cards deck</span>
        <span
          className={`${showMenu ? "rotate-180" : "rotate-0"} transition-[rotate] duration-200`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M480-360 280-560h400L480-360Z" />
          </svg>
        </span>
        <CollectionList show={showMenu} />
      </div>
    </div>
  );
}
