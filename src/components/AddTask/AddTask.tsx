import React, { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import Modal from "../Modal/Modal";
import styles from "./AddTask.module.css";

const AddTask = () => {
  const [taskText, setTaskText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { addTask } = useContext(TaskContext)!;

  const handleSubmit = () => {
    if (taskText.trim()) {
      addTask(taskText);
      setTaskText("");
      setIsModalOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
    else if (e.key === "Escape") setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className={styles.addTaskButton}>
        +
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSubmit}
        isEditing={false}
      >
        <h2>NEW NOTE</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Input your note..."
            className={styles.input}
            autoFocus
          />
        </form>
      </Modal>
    </>
  );
};

export default AddTask;
