import styles from "./UndoButton.module.css";
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

function UndoButton({ deletedTasks, restoreTask }: Props) {
  return (
    <>
      {deletedTasks.map((deletedTask) => (
        <button
          key={deletedTask.id}
          onClick={() => restoreTask(deletedTask.id)}
          className={styles.undoButton}
        >
          {deletedTask.timer} UNDO ↺
        </button>
      ))}
    </>
  );
}
export default UndoButton;
