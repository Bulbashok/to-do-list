import React, { createContext, ReactNode } from "react";
import { Theme } from "../types/theme.enum";
import { useStateWithLocalStorage } from "../hooks/useStateWithLocalStorage";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useStateWithLocalStorage<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "theme",
    (value: string) => value === Theme.dark, // Парсим строку в boolean
    (value: boolean) => (value ? Theme.dark : Theme.light) // Сериализуем boolean в строку
  );

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  React.useEffect(() => {
    const theme = isDarkMode ? Theme.dark : Theme.light;
    document.body.className = theme;
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};