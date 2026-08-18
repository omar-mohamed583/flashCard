import { useState } from "react";
import { ShowAnswerContext } from "./contextProvider";
import useLocalStorage from "../hooks/localStorage";

export default function ShowAnswerContextProvider({ children }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [cardContent, setCardContent] = useLocalStorage('cardContent', [
    {
      id: crypto.randomUUID(),
      question: "What is the capital city of Japan?",
      answer: "Tokyo",
    },
    {
      id: crypto.randomUUID(),
      question: "What planet is known as the Red Planet?",
      answer: "Mars",
    },
    {
      id: crypto.randomUUID(),
      question: "Who wrote the novel '1984'?",
      answer: "George Orwell",
    },
    {
      id: crypto.randomUUID(),
      question: "What is the chemical symbol for gold?",
      answer: "Au",
    },
    {
      id: crypto.randomUUID(),
      question: "What is the largest ocean on Earth?",
      answer: "The Pacific Ocean",
    },
    {
      id: crypto.randomUUID(),
      question: "What does CPU stand for in computing?",
      answer: "Central Processing Unit",
    },
    {
      id: crypto.randomUUID(),
      question: "How many bones are there in the adult human body?",
      answer: "206",
    },
    {
      id: crypto.randomUUID(),
      question: "What year did humans first land on the Moon?",
      answer: "1969",
    },
    {
      id: crypto.randomUUID(),
      question:
        "What is the process by which plants convert sunlight into energy?",
      answer: "Photosynthesis",
    },
    {
      id: crypto.randomUUID(),
      question:
        "Which programming language was created by Brendan Eich in 1995?",
      answer: "JavaScript",
    },
  ]);
  const [cardsCollection, setCardsCollection] = useLocalStorage('cardsCollection', [{id: crypto.randomUUID(),name: 'Default Cards', cardContent}]);
  const [currentProgress, setCurrentProgress] = useLocalStorage('c-progress', 1);

  return (
    <ShowAnswerContext
      value={{
        showAnswer,
        setShowAnswer,
        cardContent,
        setCardContent,
        currentProgress,
        setCurrentProgress,
        cardsCollection,
        setCardsCollection
      }}
    >
      {children}
    </ShowAnswerContext>
  );
}
