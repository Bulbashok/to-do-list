import { useEffect, useState } from "react";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Array<{
    id: string;
    text: string;
    completed: boolean;
  }>>([]);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    setTasks([...tasks, {
      id: Date.now().toString(),
      text,
      completed: false
    }]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (id: string, newText: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    editTask
  };
};