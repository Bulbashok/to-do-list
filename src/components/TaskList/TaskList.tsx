import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.css";
import { Task } from "../../types/Task";

interface TaskListProps {
  tasks: Task[];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  onToggle: (index: number) => void;
}

const TaskList = ({ tasks, onDelete, onEdit, onToggle }: TaskListProps) => {
  return (
    <ul className={styles.taskList}>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          onDelete={() => onDelete(index)}
          onEdit={() => onEdit(index)}
          onToggle={() => onToggle(index)}
        />
      ))}
    </ul>
  );
};

export default TaskList;
