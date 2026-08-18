import { useContext } from "react";
import { ShowAnswerContext } from "../context/contextProvider";

export default function ProgressBar() {
  const { currentProgress, cardContent } = useContext(ShowAnswerContext);

  return (
    <div className="bg-zinc-300 h-12 relative overflow-hidden">
      <span className="absolute top-1/2 left-4 text-lg leading-[normal] -translate-y-1/2 z-10">
        {currentProgress / cardContent.length * 100}%
      </span>
      <div
        style={{scale: `${(currentProgress / cardContent.length * 100)}% 100%`}}
        className={`w-full transition-transform origin-left bg-blue-400 animate-saturate h-full`}
      ></div>

      <span className="absolute top-1/2 right-4 text-lg leading-[normal] -translate-y-1/2">
        {currentProgress + " of " + cardContent.length}
      </span>
    </div>
  );
}
