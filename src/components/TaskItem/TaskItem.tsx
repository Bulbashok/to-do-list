import React, { useContext, useState, useEffect } from "react";
import { TaskContext } from "../../context/TaskContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../Modal/Modal";
import styles from "./TaskItem.module.css";

interface TaskItemProps {
  task: { text: string; completed: boolean };
  index: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
  const { deleteTask, editTask, toggleTaskCompletion, deletedTask } = useContext(TaskContext)!;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(task.text);

  const handleSave = () => {
    if (editedText.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    editTask(index, editedText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTask(index);
  };

  return (
    <li className={styles.taskItem}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(index)}
        className={styles.checkbox}
      />
      <span className={`${styles.taskText} ${task.completed ? styles.completed : ""}`}>
        {task.text}
      </span>
      <div className={styles.actions}>
        <button onClick={() => setIsEditing(true)} className={styles.editButton}>
          <FaEdit />
        </button>
        <button onClick={handleDelete} className={styles.deleteButton}>
          <FaTrash />
        </button>
      </div>
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
        isEditing={true}
      >
        <h2>CHANGE NOTE</h2>
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className={styles.editInput}
        />
      </Modal>
    </li>
  );
};

export default TaskItem;
