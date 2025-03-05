import React from "react";
import "./style.css";
import classNames from "classnames";

type Props = {
  text: string;
  checked: boolean;
  onComplete: () => void;
  onChange: () => void;
};

function Item({
  text,
  checked,
  onComplete,
  onChange,
}: Props) {
  return (
    <div className="itemContainer">
      <input
        className="checkbox"
        type="checkbox"
        checked={checked}
        onChange={onComplete}
      />
      <p
        className={classNames("text", {
          "text-through": checked,
        })}
      >
        {text}
      </p>
      <button className="changeButton" onClick={onChange}>
        редактировать
      </button>
    </div>
  );
}

export default Item;
