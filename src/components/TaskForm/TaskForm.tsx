import React, { useState } from "react";
import styles from "./TaskForm.module.css";

interface TaskFormProps {
  initialText?: string;
  onSubmit: (text: string) => void;
  onCancel?: () => void;
  submitText?: string;
}

export const TaskForm = ({
  initialText = "",
  onSubmit,
  onCancel,
  submitText = "Submit",
}: TaskFormProps) => {
  const [text, setText] = useState(initialText);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={styles.input}
        autoFocus
      />
      <div className={styles.buttons}>
        {onCancel && (
          <button type="button" onClick={onCancel} className={styles.button}>
            Cancel
          </button>
        )}
        <button type="submit" className={styles.button}>
          {submitText}
        </button>
      </div>
    </form>
  );
};
