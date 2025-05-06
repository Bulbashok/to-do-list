import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  isEditing: boolean;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, onSave, isEditing, children }: ModalProps) => {

  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {children}
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onClose}>
            CANCEL
          </button>
          <button onClick={onSave} className={styles.applyButton}>
            {isEditing ? "SAVE" : "APPLY"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;


// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// }
//
// const Modal = ({ isOpen, onClose, children }: ModalProps) => {
//   if (!isOpen) return null;
//
//   return (
//     <div className={styles.modalOverlay} onClick={onClose}>
//       <div className={styles.modal}>
//         {children}
//       </div>
//     </div>
//   );
// };
//
// export default Modal;