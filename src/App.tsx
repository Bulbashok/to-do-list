import React, { useContext, useState } from "react";
import styles from "./App.module.css";
import TaskList from "./components/TaskList/TaskList";
import { TaskProvider } from "./context/TaskContext";
import AddTask from "./components/AddTask/AddTask";
import { ThemeContext } from "./context/ThemeContext";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton";
import UndoButton from "./components/UndoButton/UndoButton";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";

enum Filter{
  All = 'All',
  Completed = 'Completed',
  Incomplete = 'Incomplete',
}

const App = () => {
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isDarkMode } = useContext(ThemeContext)!;

  const handleFilterChange = (newFilter: Filter) => {
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
            <button onClick={() => handleFilterChange(Filter.All)}>All</button>
            <button onClick={() => handleFilterChange(Filter.Completed)}>Completed</button>
            <button onClick={() => handleFilterChange(Filter.Incomplete)}>Incomplete</button>
          </DropdownMenu>
          <ThemeToggleButton />
        </div>
        <TaskList filter={filter} searchQuery={searchQuery} />
        <div className={styles.buttonsContainer}>
          <div>
            <UndoButton />
          </div>
          <AddTask />
        </div>
      </div>
    </TaskProvider>
  );
};

export default App;

