import { memo, useContext, useEffect, useState } from "react";
import styles from "./UndoButton.module.css";
import { TaskContext } from "../../context/TaskContext";

function UndoButton() {
  const [timeLeft, setTimeLeft] = useState<number>(5);
  const { restoreTask, deletedTask } = useContext(TaskContext)!;

  useEffect(() => {
    if (!deletedTask) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [deletedTask]);

  if (!deletedTask) {
    return null;
  }

  return (
    <button onClick={restoreTask} className={styles.undoButton}>
      Task Deleted UNDO {timeLeft}
    </button>
  );
}

export default UndoButton;
