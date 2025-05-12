import React, { useState } from "react";
import styles from "./AddTask.module.css";

type Props = {
  title: string;
  initialTaskText?: string;
  onSave: (value: string) => void;
  onCancel?: () => void;
};

const AddTask = ({ title, initialTaskText = "", onSave, onCancel }: Props) => {
  const [taskText, setTaskText] = useState(initialTaskText);

  const resetForm = () => {
    setTaskText("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveTask();
  };

  const saveTask = () => {
    const value = taskText.trim();

    if (!value) return;

    onSave(value);
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    onCancel?.();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Input your note..."
            className={styles.input}
            autoFocus
          />
        </form>
      </div>
      <div className={styles.buttonContainer}>
        <button type="button" className={styles.cancelButton} onClick={handleCancel}>
          CANCEL
        </button>
        <button type="submit" className={styles.applyButton} onClick={handleSubmit}>
          APPLY
        </button>
      </div>
    </div>
  );
};

export default AddTask;
