import { FC, useEffect } from "react";
import { useActions, useTypedSelector } from "../../hooks";
import CodeEditor from "./CodeEditor";
import CodePreview from "./CodePreview";
import ResizableContainer from "../Resize/ResizableContainer";
import { CodeCellProps } from "../../interfaces";

const CodeCell: FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundleCode } = useActions();

  const bundledCode = useTypedSelector((state) => state.bundles[cell.id]);

  useEffect(() => {
    const timer: number = setTimeout(async () => {
      createBundleCode(cell.id, cell.content);
    }, 750);
    console.log("rendered");
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id, createBundleCode]);

  return (
    <ResizableContainer direction="vertical">
      <div className="flex h-[calc(100%-16px)] flex-row">
        <ResizableContainer direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value: string) => updateCell(cell.id, value)}
          />
        </ResizableContainer>
        {bundledCode && (
          <CodePreview
            code={bundledCode.code}
            bundleCodeError={bundledCode.error}
          />
        )}
      </div>
    </ResizableContainer>
  );
};

export default CodeCell;
