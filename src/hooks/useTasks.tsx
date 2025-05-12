import { useState, useEffect } from "react";

interface Task {
  text: string;
  completed: boolean;
}

interface DeletedTask {
  id: string;
  index: number;
  task: Task;
  timer: number;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [deletedTasks, setDeletedTasks] = useState<DeletedTask[]>([]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDeletedTasks((prev) =>
        prev
          .map((task) => ({
            ...task,
            timer: task.timer - 1,
          }))
          .filter((task) => task.timer > 0)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTask = (text: string) => {
    setTasks([...tasks, { text, completed: false }]);
  };

  const deleteTask = (index: number) => {
    const deleted = tasks[index];
    setTasks(tasks.filter((_, i) => i !== index));
    setDeletedTasks((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        index,
        task: deleted,
        timer: 5,
      },
    ]);
  };

  const editTask = (index: number, newText: string) => {
    const newTasks = [...tasks];
    newTasks[index].text = newText;
    setTasks(newTasks);
  };

  const restoreTask = (id: string) => {
    const taskToRestore = deletedTasks.find((task) => task.id === id);
    if (!taskToRestore) return;

    const newTasks = [...tasks];
    newTasks.splice(taskToRestore.index, 0, taskToRestore.task);
    setTasks(newTasks);
    setDeletedTasks(deletedTasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return {
    tasks,
    deletedTasks,
    addTask,
    deleteTask,
    editTask,
    restoreTask,
    toggleTaskCompletion,
  };
};
