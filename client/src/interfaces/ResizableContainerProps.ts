import { ReactNode } from "react";

export interface ResizableContainerProps {
  children?: ReactNode;
  direction: "horizontal" | "vertical";
}
