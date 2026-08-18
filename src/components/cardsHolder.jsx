import { useContext } from "react";
import Card from "./card";
import { ShowAnswerContext } from "../context/contextProvider";

export default function CardHolder() {
  const { cardContent, currentProgress, showAnswer } = useContext(ShowAnswerContext);

  const currentCard = cardContent[currentProgress - 1];

  return (
    <div className="w-[50vw] h-[60vh] min-w-78.75 mx-auto flex bg-zinc-300 flex-wrap content-center justify-center">
        <Card
          key={currentCard.id}
          question={currentCard.question}
          answer={currentCard.answer}
          showAnswer={showAnswer}
        />
    </div>
  );
}
