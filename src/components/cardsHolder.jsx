import { useContext } from "react";
import Card from "./card";
import { DataContext } from "../context/contextProvider";

export default function CardHolder() {
  const { cardsCollection, activeCardDeskId, currentProgress, showAnswer, showOnHover } =
    useContext(DataContext);

  const currentCard = cardsCollection.find((co) => co.id === activeCardDeskId).cardContent[currentProgress - 1];

  return (
    <div className="w-[50vw] h-[60vh] min-w-78.75 mx-auto flex bg-zinc-300 flex-wrap content-center justify-center">
        <Card
          key={currentCard.id}
          question={currentCard.question}
          answer={currentCard.answer}
          showAnswer={showAnswer}
          showOnHover={showOnHover}
        />
    </div>
  );
}
