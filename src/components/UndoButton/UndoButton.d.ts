import { Task } from "../../types/task.model";
type Props = {
    deletedTasks: {
        id: string;
        index: number;
        task: Task;
        timer: number;
    }[];
    restoreTask: (id: string) => void;
};
declare function UndoButton({ deletedTasks, restoreTask }: Props): import("react/jsx-runtime").JSX.Element;
export default UndoButton;
