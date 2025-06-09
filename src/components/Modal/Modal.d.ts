import React from "react";
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
declare const Modal: ({ isOpen, onClose, children }: ModalProps) => import("react/jsx-runtime").JSX.Element | null;
export default Modal;
