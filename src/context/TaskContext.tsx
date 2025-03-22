import React, { createContext, useState, ReactNode, useEffect, useMemo, useCallback } from "react";

interface Task {
  text: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (text: string) => void;
  deleteTask: (index: number) => void;
  editTask: (index: number, newText: string) => void;
  restoreTask: () => void;
  toggleTaskCompletion: (index: number) => void;
  deletedTask: { index: number; task: Task } | null;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [deletedTask, setDeletedTask] = useState<{ index: number; task: Task } | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (deletedTask) {
      const timer = setTimeout(() => {
        setDeletedTask(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [deletedTask]);

  const addTask = (text: string) => {
    setTasks([...tasks, { text, completed: false }]);
  };

  const deleteTask = (index: number) => {
    const deleted = tasks[index];
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setDeletedTask({ index, task: deleted });
  };

  const editTask = (index: number, newText: string) => {
    const newTasks = [...tasks];
    newTasks[index].text = newText;
    setTasks(newTasks);
  };

  const restoreTask = useCallback(() => {
    if (deletedTask) {
      const newTasks = [...tasks];
      newTasks.splice(deletedTask.index, 0, deletedTask.task);
      setTasks(newTasks);
      setDeletedTask(null);
    }
  }, [deletedTask, tasks]);

  const toggleTaskCompletion = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const value = useMemo(() => {
    return {
      tasks,
      addTask,
      deleteTask,
      editTask,
      restoreTask,
      toggleTaskCompletion,
      deletedTask,
    };
  }, [deleteTask, deletedTask, editTask, tasks, restoreTask, toggleTaskCompletion]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
