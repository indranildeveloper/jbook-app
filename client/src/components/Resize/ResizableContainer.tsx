import { FC, useEffect, useState } from "react";
import { ResizableBox, type ResizableBoxProps } from "react-resizable";
import ResizeDragHandle from "./ResizeDragHandle";
import { ResizableContainerProps } from "../../interfaces";

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
      handle: <ResizeDragHandle />,
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
      handle: <ResizeDragHandle />,
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default ResizableContainer;
