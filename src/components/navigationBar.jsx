import { useContext } from "react";
import { ShowAnswerContext } from "../context/contextProvider";

export default function NavigationBar() {
  const {setCurrentProgress, currentProgress, setShowAnswer, cardContent } =
    useContext(ShowAnswerContext);

  return (
    <div className="bg-zinc-300 p-1 px-2 flex justify-between gap-2 *:flex *:items-center *:content-center *:gap-1 *:p-2 *:px-3 *:hover:bg-blue-400 *:rounded-lg *:transition-[background,scale] *:duration-200 *:disabled:opacity-30 *:disabled:hover:bg-transparent *:font-medium *:cursor-pointer *:disabled:cursor-not-allowed *:active:scale-85 *:disabled:active:scale-100">
      <button disabled={currentProgress === 1} onClick={() => {setCurrentProgress(cur => cur - 1); setShowAnswer(false)}} aria-label="previous Card">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="rotate-180" fill="#000000"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
        Back
      </button>

      <button onClick={() => setShowAnswer(curV => !curV)} aria-label="show Answer">
        Show answer
      </button>

      <button onClick={() => {setCurrentProgress(cur => cur + 1); setShowAnswer(false)}} disabled={currentProgress === cardContent.length} aria-label="next Card">
        Next
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
      </button>
    </div>
  );
}
