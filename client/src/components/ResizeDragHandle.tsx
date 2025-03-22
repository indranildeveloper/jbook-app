import { forwardRef } from "react";
import { ResizeHandle } from "react-resizable";
import { MdDragHandle } from "react-icons/md";
import { cn } from "../utils/utils";

const ResizeDragHandle = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { handleAxis, ...rest } = props as { handleAxis: ResizeHandle };

  return (
    <div
      ref={ref}
      className={cn(
        "h-4 w-full bg-primary cursor-row-resize",
        handleAxis === "e" && "h-full w-4 bg-primary cursor-col-resize"
      )}
      {...rest}
    >
      <div
        className={cn(
          "flex items-center justify-center",
          handleAxis === "e" && "flex flex-col h-full"
        )}
      >
        <MdDragHandle className={cn(handleAxis === "e" && "rotate-90")} />
      </div>
    </div>
  );
});

export default ResizeDragHandle;
