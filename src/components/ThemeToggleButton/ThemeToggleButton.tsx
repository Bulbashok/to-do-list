import React, { useContext } from "react";
import styles from "./ThemeToggleButton.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)!;

  return (
    <button onClick={toggleTheme} className={styles.themeToggleButton}>
      {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
};

export default ThemeToggleButton;
