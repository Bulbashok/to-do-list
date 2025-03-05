import React, { useRef } from "react";

type Props = {
  onSubmit: (value: string) => void;
};

function Form({ onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!inputRef.current) {
      return;
    }

    const value = inputRef.current.value.trim();
    if (!value) return;

    onSubmit(value);

    inputRef.current.value = "";
  }

  return (
    <form className="inputDiv" onSubmit={handle}>
      <input
        ref={inputRef}
        className="input"
        placeholder="введите текст"
      />
      <button className="inputButton" type="submit">
        Добавить
      </button>
    </form>
  );
}

export default Form;
