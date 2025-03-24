import { FC, JSX } from "react";
import { CellListItemProps } from "../../interfaces";
import CodeCell from "../CodeEditorCell/CodeCell";
import TextEditor from "../TextEditorCell/TextEditor";
import ActionBar from "../Actions/ActionBar";

const CellListItem: FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;

  if (cell.type === "code") {
    child = <CodeCell cell={cell} />;
  } else {
    child = <TextEditor cell={cell} />;
  }

  return (
    <div>
      <ActionBar id={cell.id} />
      <div>{child}</div>
    </div>
  );
};

export default CellListItem;
