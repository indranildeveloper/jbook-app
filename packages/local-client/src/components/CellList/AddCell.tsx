import { FC } from "react";
import { useActions } from "../../hooks";
import { AddCellProps } from "../../interfaces";
import { FaPlus } from "react-icons/fa";
import { cn } from "../../utils/utils";

const AddCell: FC<AddCellProps> = ({ previousCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();

  return (
    <div
      className={cn(
        "my-3 w-full relative opacity-0 hover:opacity-100 transition-opacity ease-in delay-100 duration-300",
        forceVisible && "opacity-100"
      )}
    >
      <div className="flex items-center justify-center gap-10">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => insertCellAfter(previousCellId, "code")}
        >
          <FaPlus />
          <span>Code</span>
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => insertCellAfter(previousCellId, "text")}
        >
          <FaPlus />
          <span>Text</span>
        </button>
      </div>

      <div className="absolute top-1/2 bottom-1/2 left-[2.5%] right-[2.5%] border-b border-slate-500 w-[95%] -z-10" />
    </div>
  );
};

export default AddCell;
