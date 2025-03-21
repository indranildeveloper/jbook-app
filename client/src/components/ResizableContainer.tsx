import { FC, forwardRef, useEffect, useState } from "react";
import {
  ResizableBox,
  type ResizableBoxProps,
  type ResizeHandle,
} from "react-resizable";
import { MdDragIndicator } from "react-icons/md";
import { ResizableContainerProps } from "../interfaces";
import { cn } from "../utils/utils";

const DragHandle = forwardRef<
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
        <MdDragIndicator className={cn(handleAxis === "s" && "rotate-90")} />
        <MdDragIndicator className={cn(handleAxis === "s" && "rotate-90")} />
        <MdDragIndicator className={cn(handleAxis === "s" && "rotate-90")} />
      </div>
    </div>
  );
});

const ResizableContainer: FC<ResizableContainerProps> = ({
  direction,
  children,
}) => {
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [updatedWidth, setUpdatedWidth] = useState<number>(
    window.innerWidth * 0.75
  );

  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    let timer: number | undefined;

    const resizeListener = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < updatedWidth) {
          setUpdatedWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [updatedWidth]);

  if (direction === "horizontal") {
    resizableProps = {
      height: Infinity,
      width: updatedWidth,
      resizeHandles: ["e"],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      handle: <DragHandle />,
      className: "flex flex-row",
      onResizeStop: (_event, data) => {
        setUpdatedWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, innerHeight * 0.1],
      handle: <DragHandle />,
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default ResizableContainer;
