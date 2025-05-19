import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "./TaskItem.module.css";

interface TaskItemProps {
  task: { text: string; completed: boolean };
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}

const TaskItem = ({ task, onDelete, onEdit, onToggle }: TaskItemProps) => {
  return (
    <li className={styles.taskItem}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
        className={styles.checkbox}
      />
      <span className={`${styles.taskText} ${task.completed ? styles.completed : ""}`}>
        {task.text}
      </span>
      <div className={styles.actions}>
        <button onClick={onEdit} className={styles.editButton}>
          <FaEdit />
        </button>
        <button onClick={onDelete} className={styles.deleteButton}>
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
