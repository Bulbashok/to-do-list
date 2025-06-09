import { Task } from "../../types/task.model";
interface TaskListProps {
    tasks: Task[];
    onDelete: (index: number) => void;
    onEdit: (index: number) => void;
    onToggle: (index: number) => void;
}
declare const TaskList: ({ tasks, onDelete, onEdit, onToggle }: TaskListProps) => import("react/jsx-runtime").JSX.Element;
export default TaskList;
