import { memo, useContext, useEffect, useState } from "react";
import styles from "./UndoButton.module.css";

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
      {timeLeft} UNDO ↺
    </button>
  );
}

export default UndoButton;
