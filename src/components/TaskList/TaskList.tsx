import React, { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.css";

interface TaskListProps {
  filter: "All" | "Completed" | "Incomplete";
  searchQuery: string;
}

const TaskList: React.FC<TaskListProps> = ({ filter, searchQuery }) => {
  const { tasks } = useContext(TaskContext)!;

  const filteredTasks = tasks.filter((task) => {
    if (searchQuery && !task.text.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filter === "Completed") return task.completed;
    if (filter === "Incomplete") return !task.completed;
    return true;
  });

  return (
    <ul className={styles.taskList}>
      {filteredTasks.map((task, index) => (
        <TaskItem key={index} task={task} index={index} />
      ))}
    </ul>
  );
};

export default TaskList;
