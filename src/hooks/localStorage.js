import { useEffect, useState } from "react";

function readLocalStorage(key, defaultValue) {
  if (!window.localStorage) return defaultValue;

  const valueInStorage = localStorage.getItem(key);

  try {
    if (valueInStorage != null || valueInStorage != undefined) return JSON.parse(valueInStorage);

  } catch (e) {
    console.warn('Error in LocalStorage Get Item, ' + e);
  }
  return defaultValue;
}

export default function useLocalStorage( key, defaultValue ) {
  const [prevKey, setPrevKey] = useState(key);
  const [value, setValue] = useState(() => readLocalStorage(key, defaultValue));

  if (prevKey !== key) {
    setPrevKey(key);
    setValue(readLocalStorage(key, defaultValue))
  }

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}