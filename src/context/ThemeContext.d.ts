import React, { ReactNode } from "react";
interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}
export declare const ThemeContext: React.Context<ThemeContextType | undefined>;
interface ThemeProviderProps {
    children: ReactNode;
}
export declare const ThemeProvider: ({ children }: ThemeProviderProps) => import("react/jsx-runtime").JSX.Element;
export {};
