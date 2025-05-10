import React, { useContext, useState } from "react";
import styles from "./App.module.css";
import TaskList from "./components/TaskList/TaskList";
import { useTaskContext } from "./context/TaskContext";
import AddTask from "./components/AddTask/AddTask";
import { ThemeContext } from "./context/ThemeContext";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton";
import UndoButton from "./components/UndoButton/UndoButton";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import Modal from "./components/Modal/Modal";
import useModal from "./hooks/useModal";

enum Filter {
  All = "All",
  Completed = "Completed",
  Incomplete = "Incomplete",
}

const App = () => {
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isDarkMode } = useContext(ThemeContext)!;
  const { isOpen, closeModal, openModal } = useModal();
  const { addTask, tasks, deleteTask, editTask, toggleTaskCompletion, restoreTask, deletedTask } =
    useTaskContext();
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

  const onSaveTask = (value: string) => {
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
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onEdit={handleEditTask}
        onToggle={toggleTaskCompletion}
      />
      <div className={styles.buttonsContainer}>
        <div>{deletedTask && <UndoButton restoreTask={restoreTask} />}</div>
      </div>
      <button onClick={openModal} className={styles.addTaskButton}>
        +
      </button>
      <Modal isOpen={isOpen} onClose={closeTaskModal}>
        <AddTask
          title={editingTask ? "EDIT TASK" : "ADD TASK"}
          initialTaskText={editingTask?.text}
          onSave={onSaveTask}
          onCancel={closeTaskModal}
        />
      </Modal>
    </div>
  );
};

export default App;
