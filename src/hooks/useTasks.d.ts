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
export declare const useTasks: () => {
    tasks: Task[];
    deletedTasks: DeletedTask[];
    addTask: (text: string) => void;
    deleteTask: (index: number) => void;
    editTask: (index: number, newText: string) => void;
    restoreTask: (id: string) => void;
    toggleTaskCompletion: (index: number) => void;
};
export {};
