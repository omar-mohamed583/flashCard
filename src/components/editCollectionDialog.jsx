import { useContext, useId } from "react";
import { DataContext } from "../context/contextProvider";

export default function Dialog() {
  const {editMenuObj, cardsCollection, setCardsCollection} = useContext(DataContext);
  const activeCollection = cardsCollection.find(deck => deck.id === editMenuObj.id);

  return (
    <dialog className="brightness-50 transition-[scale,opacity] p-4 rounded-xl">
      <form action="" method="dialog" className="flex flex-col gap-4">
        <h3 className="text-xl leading-[normal]">Deck Info</h3>

        {activeCollection.cardContent.map(card => (<Inputs key={card.id} backValue={card.answer} faceValue={card.question} />))}
      </form>
    </dialog>
  )
}

function Inputs({ faceValue, backValue }) {
  const id = useId();

  return (
    <div className="grid grid-cols-2 grid-rows-2">
      <hr />
      <label htmlFor={`${id}-face`}>Card face</label>
      <input
        type="text"
        id={`${id}-face`}
        value={faceValue}
        required
      />
      <label htmlFor={`${id}-back`}>Card back</label>
      <input
        type="text"
        id={`${id}-back`}
        value={backValue}
        required
      />
    </div>
  );
}