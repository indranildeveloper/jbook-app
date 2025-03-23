import { FC, JSX } from "react";
import { CellListItemProps } from "../../interfaces";
import CodeCell from "../CodeEditorCell/CodeCell";
import TextEditor from "../TextEditorCell/TextEditor";

const CellListItem: FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;

  if (cell.type === "code") {
    child = <CodeCell />;
  } else {
    child = <TextEditor />;
  }

  return <div>{child}</div>;
};

export default CellListItem;
