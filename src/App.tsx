import React, { useContext, useState } from "react";
import styles from "./App.module.css";
import TaskList from "./components/TaskList/TaskList";
import { TaskProvider } from "./context/TaskContext";
import AddTaskForm from "./components/AddTaskForm/AddTaskForm";
import { ThemeContext } from "./context/ThemeContext";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton";
import UndoButton from "./components/UndoButton/UndoButton";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";

const App: React.FC = () => {
  const [filter, setFilter] = useState<"All" | "Completed" | "Incomplete">("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isDarkMode } = useContext(ThemeContext)!;

  const handleFilterChange = (newFilter: "All" | "Completed" | "Incomplete") => {
    setFilter(newFilter);
  };

  return (
    <TaskProvider>
      <div className={`${styles.container} ${isDarkMode ? styles.dark : styles.light}`}>
        <h1 className={styles.title}>TODO LIST</h1>
        <div className={styles.wrapper}>
          <input
            type="text"
            placeholder="Search note..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <DropdownMenu
            trigger={<button className={styles.filterButton}>{filter.toUpperCase()}</button>}
          >
            <button onClick={() => handleFilterChange("All")}>All</button>
            <button onClick={() => handleFilterChange("Completed")}>Completed</button>
            <button onClick={() => handleFilterChange("Incomplete")}>Incomplete</button>
          </DropdownMenu>
          <ThemeToggleButton />
        </div>
        <TaskList filter={filter} searchQuery={searchQuery} />
        <div className={styles.buttonsContainer}>
          <div>
            <UndoButton />
          </div>
          <AddTaskForm />
        </div>
      </div>
    </TaskProvider>
  );
};

export default App;

