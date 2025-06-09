import React, { useContext, useState } from "react";
import styles from "./App.module.css";
import TaskList from "./components/TaskList/TaskList";
import { useTasks } from "./hooks/useTasks";
import AddTask from "./components/AddTask/AddTask";
import { ThemeContext } from "./context/ThemeContext";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton";
import UndoButton from "./components/UndoButton/UndoButton";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import Modal from "./components/Modal/Modal";
import useModal from "./hooks/useModal";
import { Filter } from "./types/filter.enum";

const App = () => {
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isDarkMode } = useContext(ThemeContext)!;
  const { isOpen, closeModal, openModal } = useModal();
  const { tasks, addTask, deleteTask, editTask, toggleTaskCompletion, restoreTask, deletedTasks } =
    useTasks();
  const [editingTask, setEditingTask] = useState<{ index: number; text: string } | undefined>(
    undefined
  );

  const filteredTasks = tasks.filter((task) => {
    if (searchQuery && !task.text.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filter === "Completed") return task.completed;
    if (filter === "Incomplete") return !task.completed;
    return true;
  });

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  const handleSaveTask = (value: string) => {
    if (editingTask) {
      editTask(editingTask.index, value);
    } else {
      addTask(value);
    }

    closeTaskModal();
  };

  const closeTaskModal = () => {
    closeModal();
    setEditingTask(undefined);
  };

  const handleEditTask = (index: number) => {
    openModal();
    const task = tasks[index];
    setEditingTask({ index, text: task.text });
  };

  return (
    <div className={`${styles.appContainer} ${isDarkMode ? styles.themeDark : styles.themeLight}`}>
      <h1 className={styles.appTitle}>TODO LIST</h1>
      <div className={styles.searchContainer}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search note..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchField}
          />
          <span className={styles.searchIcon}>🔍︎</span>
        </div>
        <DropdownMenu
          trigger={<button className={styles.filterBtn}>{filter.toUpperCase()}</button>}
        >
          <button onClick={() => handleFilterChange(Filter.All)}>All</button>
          <button onClick={() => handleFilterChange(Filter.Completed)}>Completed</button>
          <button onClick={() => handleFilterChange(Filter.Incomplete)}>Incomplete</button>
        </DropdownMenu>
        <ThemeToggleButton />
      </div>
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onEdit={handleEditTask}
        onToggle={toggleTaskCompletion}
      />

      <div className={styles.actionsBar}>
        <div className={styles.undoButtonCountainer}>
          {deletedTasks && <UndoButton deletedTasks={deletedTasks} restoreTask={restoreTask} />}
        </div>
        <button onClick={openModal} className={styles.addBtn}>
          +
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={closeTaskModal}>
        <AddTask
          title={editingTask ? "EDIT TASK" : "ADD TASK"}
          initialTaskText={editingTask?.text}
          onSave={handleSaveTask}
          onCancel={closeTaskModal}
        />
      </Modal>
    </div>
  );
};

export default App;
