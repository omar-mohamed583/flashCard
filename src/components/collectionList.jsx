import { useContext } from "react";
import { ShowAnswerContext } from "../context/contextProvider";

export default function CollectionList({ show }) {
  const { cardsCollection } = useContext(ShowAnswerContext);

  return (
    <ul className={`menu absolute top-[110%] left-0 w-full bg-[#fafafa] rounded-lg grid border border-zinc-600/50 right-0 opacity-0 scale-80 transition-[opacity,scale] pointer-events-none scale-x-75 [&.active]:scale-y-100 [&.active]:scale-x-100 [&.active]:opacity-100 [&.active]:pointer-events-auto ${show ? 'active' : ''}`}>
      {cardsCollection.map((co) => (
        <CardCollectionItem dataId={co.id}>{co.name}</CardCollectionItem>
      ))}
    </ul>
  );
}

function CardCollectionItem({ dataId, children }) {
  return (
    <li
      key={dataId}
      data-id={dataId}
      className="p-2 py-2.5 rounded-lg text-md leading-[normal] transition-colors hover:bg-zinc-300 duration-200"
    >
      {children}
    </li>
  );
}
