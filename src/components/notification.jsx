import { useContext, useEffect, useRef } from "react";
import { DataContext } from "../context/contextProvider";

export default function NotificationBar() {
  const { notification } = useContext(DataContext);
  const prevMessage = useRef();

  useEffect(() => {
    prevMessage.current = notification.message;
  }, [notification.message]);

  return (
    <div
      className={`notification fixed z-100 top-22 left-0 ps-4 p-2 rounded-e-xl text-white ${notification.type === "success" ? "bg-green-500" : notification.type === "error" ? "bg-red-500" : "bg-slate-500"} ${notification.show ? "showNotification" : ""} `}
    >
      <span className="truncate max-w-40">
        {notification.message || prevMessage.current}
      </span>
    </div>
  );
}
