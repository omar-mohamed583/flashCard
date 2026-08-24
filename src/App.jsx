import CardsCollectionHolder from "./components/cardsCollectionsHolder";
import CardHolder from "./components/cardsHolder";
import Dialog from "./components/editCollectionDialog";
// import Dialog from "./components/editCollectionDialog";
import LayoutHolder from "./components/layoutHolder";
import NavigationBar from "./components/navigationBar";
import NotificationBar from "./components/notification";
import ProgressBar from "./components/progressbar";
import SideBar from "./components/sidebar";
import DataContextProvider from "./context/showAnswercontext";

export default function App() {
  return (
    <DataContextProvider>
      <main className="h-full grid place-content-center">
        <h1 className="text-2xl font-bold absolute left-[5%] top-[5%] ">
          Flash Cards
        </h1>

        <CardsCollectionHolder />

        <LayoutHolder>
          <ProgressBar />
          <CardHolder />
          <NavigationBar />
        </LayoutHolder>

        <Dialog />
      </main>
      <NotificationBar />
      <SideBar />
    </DataContextProvider>
  );
}
