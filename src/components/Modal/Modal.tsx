import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  isEditing: boolean;
  onClose: () => void;
  onSave: () => void
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, isEditing, children }) => {
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
