import React, { useState, useContext} from "react";
import styles from "./App.module.css";
import TaskList from "./components/TaskList/TaskList";
import { TaskProvider } from "./context/TaskContext";
import AddTaskForm from "./components/AddTaskForm/AddTaskForm";
import { ThemeContext } from "./context/ThemeContext";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton"

const App: React.FC = () => {
  const [filter, setFilter] = useState<"All" | "Completed" | "Incomplete">("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const { isDarkMode } = useContext(ThemeContext)!;

  const handleFilterChange = (newFilter: "All" | "Completed" | "Incomplete") => {
    setFilter(newFilter);
    setIsFilterOpen(false);
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
          <div className={styles.filterContainer}>
            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className={styles.filterButton}>
            {filter.toUpperCase()}
            </button>
            {isFilterOpen && (
              <div className={styles.filterDropdown}>
                <button onClick={() => handleFilterChange("All")}>All</button>
                <button onClick={() => handleFilterChange("Completed")}>Completed</button>
                <button onClick={() => handleFilterChange("Incomplete")}>Incomplete</button>
              </div>
            )}
          </div>
          <ThemeToggleButton/>
        </div>
        <TaskList filter={filter} searchQuery={searchQuery} />
        <AddTaskForm />
      </div>
    </TaskProvider>
  );
};

export default App;
