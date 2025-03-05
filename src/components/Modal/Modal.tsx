import React from "react";
import "./styles.css";

type Props = {
  isOpen: boolean;
  close: () => void;
};

function Modal({ isOpen, close }: Props) {
  if (!isOpen) return;
  return (
    <div className="overlay">
      <div onClick={close} className="content"></div>
    </div>
  );
}

export default Modal;
