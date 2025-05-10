import { memo, useContext, useEffect, useState } from "react";
import styles from "./UndoButton.module.css";
import { TaskContext } from "../../context/TaskContext";
import { Task } from "../../types/Task";

type Props = {
  restoreTask: () => void;
};

function UndoButton({ restoreTask }: Props) {
  const [timeLeft, setTimeLeft] = useState<number>(5);

  useEffect(() => {
    setTimeLeft(5);

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
  }, []);

  return (
    <button onClick={restoreTask} className={styles.undoButton}>
      Task Deleted UNDO {timeLeft}
    </button>
  );
}

export default UndoButton;
