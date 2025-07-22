import { useEffect, useState } from "react";

export const useStateWithLocalStorage = <T,>(
  localStorageKey: string,
  initialState: T,
  parseFn?: (value: string) => T,
  stringifyFn?: (value: T) => string
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    const savedValue = localStorage.getItem(localStorageKey);
    if (savedValue !== null) {
      return parseFn ? parseFn(savedValue) : JSON.parse(savedValue);
    }
    return initialState;
  });

  useEffect(() => {
    const valueToStore = stringifyFn ? stringifyFn(state) : JSON.stringify(state);
    localStorage.setItem(localStorageKey, valueToStore);
  }, [state, localStorageKey, stringifyFn]);

  return [state, setState];
};
