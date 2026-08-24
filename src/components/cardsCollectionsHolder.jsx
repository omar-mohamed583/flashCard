import { useContext, useEffect, useMemo, useRef, useState } from "react";
import CollectionList, { EditOptions } from "./collectionList";
import { DataContext } from "../context/contextProvider";

export default function CardsCollectionHolder() {
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const {
    activeCardDeckId,
    cardsCollection,
    showOnHover,
    setShowOnHover,
    setShowSideBar,
    editMenuObj,
    setEditObjMenu,
  } = useContext(DataContext);

  const menuRef = useRef();
  const mobileMenuRef = useRef();

  const activeDeckName = useMemo(
    () => cardsCollection?.find((co) => co?.id === activeCardDeckId)?.name,
    [activeCardDeckId, cardsCollection],
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
    if (editMenuObj.opened)
      setEditObjMenu((curr) => ({ ...curr, opened: false }));
  }

  // Close the mobile dropdown on outside click, same pattern as the
  // deck-select menu.
  useEffect(() => {
    if (!showMobileMenu) return;

    function handleOutsideClick(e) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setShowMobileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showMobileMenu]);

  const flipToggleLabel = "Flip card on hover";
  const isDisabled = cardsCollection.length ? false : true;

  return (
    <div className="absolute right-[4%] top-[5%] z-10">
      {/* md and up: original inline row, unchanged */}
      <div className="hidden md:flex flex-row-reverse gap-4 min-w-max">
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
          <span>Select cards deck</span>
          <span>
            <svg
              className={`${showMenu ? "rotate-180 translate-y-0.5 translate-x-0.5" : "rotate-0"} transition-[rotate,translate] duration-200`}
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 20 20"
              fill="none"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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
          className={`flip-on-hover flex gap-2 items-center border border-zinc-800/60 p-2 rounded-lg transition-colors cursor-pointer ${showOnHover ? "bg-blue-400" : ""} disabled:opacity-50 disabled:cursor-auto`}
          onClick={() => setShowOnHover((curr) => !curr)}
          disabled={isDisabled}
        >
          {flipToggleLabel}
        </button>
      </div>

      {/* below md: single hamburger button that opens a stacked dropdown
          holding all three controls */}
      <div
        className="md:hidden relative"
        ref={mobileMenuRef}
      >
        <button
          className="cursor-pointer border border-zinc-600/70 rounded-lg p-2 flex items-center justify-center bg-white"
          onClick={() => setShowMobileMenu((curr) => !curr)}
          aria-label="Open deck options"
          aria-expanded={showMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line
              x1="4"
              y1="6"
              x2="20"
              y2="6"
            />
            <line
              x1="4"
              y1="12"
              x2="20"
              y2="12"
            />
            <line
              x1="4"
              y1="18"
              x2="20"
              y2="18"
            />
          </svg>
        </button>

        {showMobileMenu && (
          <div className="absolute right-0 top-full mt-2 flex flex-col gap-3 border border-zinc-600/70 rounded-lg p-3 bg-white shadow-lg w-56">
            <button
              className="fancy-btn cursor-pointer bg-blue-800 text-white p-2 rounded-lg text-left"
              onClick={() => {
                setShowSideBar(true);
                setShowMobileMenu(false);
              }}
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
              <span>Select cards deck</span>
              <span>
                <svg
                  className={`${showMenu ? "rotate-180 translate-y-0.5 translate-x-0.5" : "rotate-0"} transition-[rotate,translate] duration-200`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
              className={`flip-on-hover flex gap-2 items-center border border-zinc-800/60 p-2 rounded-lg transition-colors cursor-pointer ${showOnHover ? "bg-blue-400" : ""} disabled:opacity-50 disabled:cursor-auto`}
              onClick={() => setShowOnHover((curr) => !curr)}
              disabled={isDisabled}
            >
              {flipToggleLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
