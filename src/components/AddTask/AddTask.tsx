import React, { useContext, useState } from "react";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit} className={styles.modalForm}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Input your note..."
          className={styles.input}
          autoFocus
        />
        <div className={styles.buttonContainer}>
          <button type="button" className={styles.cancelButton} onClick={handleCancel}>
            CANCEL
          </button>
          <button type="submit" className={styles.applyButton}>
            APPLY
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTask;
