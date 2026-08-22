import { useContext } from "react";
import { DataContext } from "../context/contextProvider";

export default function ProgressBar() {
  const { currentProgress, activeDeckLength } = useContext(DataContext);

  return (
    <div className="bg-zinc-300 h-12 relative overflow-hidden">
      <span className="absolute top-1/2 left-4 text-lg leading-[normal] -translate-y-1/2 z-10">
        {Math.trunc((currentProgress / activeDeckLength) * 100)}%
      </span>
      <div
        style={{
          scale: `${(currentProgress / activeDeckLength) * 100}% 100%`,
        }}
        role="progressbar"
        className={`w-full transition-transform origin-left bg-blue-400 animate-saturate h-full`}
      ></div>

      <span className="absolute top-1/2 right-4 text-lg leading-[normal] -translate-y-1/2">
        {currentProgress + " of " + activeDeckLength}
      </span>
    </div>
  );
}
