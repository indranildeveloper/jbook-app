import { FC, useState, useEffect } from "react";
import { useActions } from "../../hooks";
import CodeEditor from "./CodeEditor";
import CodePreview from "./CodePreview";
import ResizableContainer from "../Resize/ResizableContainer";
import bundleCode from "../../bundler";
import { CodeCellProps } from "../../interfaces";

const CodeCell: FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState<string>("");
  const [bundleCodeError, setBundleCodeError] = useState<string>("");

  const { updateCell } = useActions();

  useEffect(() => {
    const timer: number = setTimeout(async () => {
      const outputCode = await bundleCode(cell.content);
      setCode(outputCode.code);
      setBundleCodeError(outputCode.error);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <ResizableContainer direction="vertical">
      <div className="flex h-[calc(100%-16px)] flex-row">
        <ResizableContainer direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value: string) => updateCell(cell.id, value)}
          />
        </ResizableContainer>
        <CodePreview code={code} bundleCodeError={bundleCodeError} />
      </div>
    </ResizableContainer>
  );
};

export default CodeCell;
