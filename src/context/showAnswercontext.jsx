import { useMemo, useState } from "react";
import { DataContext } from "./contextProvider";
import useLocalStorage from "../hooks/localStorage";

export default function DataContextProvider({ children }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const [cardsCollection, setCardsCollection] = useLocalStorage(
    "cardsCollection",
    [
      {
        id: crypto.randomUUID(),
        name: "Default Cards",
        cardContent: [
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
        ],
      },
    ],
  );

  const [currentProgress, setCurrentProgress] = useLocalStorage(
    "c-progress",
    1,
  );

  const [editMenuObj, setEditObjMenu] = useState({id: '', opened: false});

  const [showOnHover, setShowOnHover] = useLocalStorage('show-on-hover', false);

  const [activeCardDeckId, setActiveCardDeckId] = useLocalStorage(
    "activeDeckId",
    cardsCollection[0]?.id,
  );

  const [notification, setNotification] = useState({message: '', show: false, type: 'info'});


  const activeDeckLength = useMemo(
    () =>
      cardsCollection.find((co) => co?.id === activeCardDeckId)?.cardContent
        .length,
    [cardsCollection, activeCardDeckId],
  );

  const [showSideBar, setShowSideBar] = useState(false);

  const [showDialog, setShowDialog] = useState(false);

  return (
    <DataContext
      value={{
        showAnswer,
        setShowAnswer,
        currentProgress,
        setCurrentProgress,
        cardsCollection,
        setCardsCollection,
        activeCardDeckId,
        setActiveCardDeckId,
        activeDeckLength,
        showOnHover,
        setShowOnHover,
        setShowSideBar,
        showSideBar,
        editMenuObj,
        setEditObjMenu,
        setShowDialog,
        showDialog,
        notification,
        setNotification,
      }}
    >
      {children}
    </DataContext>
  );
}
