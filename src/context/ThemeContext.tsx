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
    "theme",
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    (value: string) => value === Theme.dark,
    (value: boolean) => (value ? Theme.dark : Theme.light)
  );

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  React.useEffect(() => {
    const theme = isDarkMode ? Theme.dark : Theme.light;
    document.body.className = theme;
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};
