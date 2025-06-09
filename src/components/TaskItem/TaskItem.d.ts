interface TaskItemProps {
    task: {
        text: string;
        completed: boolean;
    };
    onEdit: () => void;
    onDelete: () => void;
    onToggle: () => void;
}
declare const TaskItem: ({ task, onDelete, onEdit, onToggle }: TaskItemProps) => import("react/jsx-runtime").JSX.Element;
export default TaskItem;
