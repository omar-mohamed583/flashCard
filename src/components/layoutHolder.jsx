import { useContext } from "react";
import { DataContext } from "../context/contextProvider";

export default function LayoutHolder({ children }) {
  const { cardsCollection } = useContext(DataContext);
  return (
    <div className="grid gap-4 justify-center rounded-xl *:rounded-xl overflow-hidden perspective-normal">
      {cardsCollection.length ? (
        children
      ) : (
        <div className="mt-14 place-self-center text-xl font-bold">
          No Cards Deck To Show.
        </div>
      )}
    </div>
  );
}
