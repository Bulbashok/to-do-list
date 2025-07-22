declare function useModal(initialState?: boolean): {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
};
export default useModal;
