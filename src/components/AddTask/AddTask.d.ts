type Props = {
    title: string;
    initialTaskText?: string;
    onSave: (value: string) => void;
    onCancel?: () => void;
};
declare const AddTask: ({ title, initialTaskText, onSave, onCancel }: Props) => import("react/jsx-runtime").JSX.Element;
export default AddTask;
