import { FC } from "react";
import { useActions } from "../../hooks";
import { ActionBarProps } from "../../interfaces";
import { FaArrowDown, FaArrowUp, FaTimes } from "react-icons/fa";

const ActionBar: FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="bg-slate-800 flex items-center justify-end p-2 gap-2">
      <button
        className="btn btn-primary btn-sm"
        onClick={() => moveCell(id, "up")}
      >
        <FaArrowUp />
      </button>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => moveCell(id, "down")}
      >
        <FaArrowDown />
      </button>
      <button className="btn btn-error btn-sm" onClick={() => deleteCell(id)}>
        <FaTimes />
      </button>
    </div>
  );
};

export default ActionBar;
