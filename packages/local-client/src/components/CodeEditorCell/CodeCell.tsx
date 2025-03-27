import { FC, useEffect } from "react";
import { useActions, useCumulativeCode, useTypedSelector } from "../../hooks";
import CodeEditor from "./CodeEditor";
import CodePreview from "./CodePreview";
import ResizableContainer from "../Resize/ResizableContainer";
import { CodeCellProps } from "../../interfaces";

const CodeCell: FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundleCode } = useActions();

  const bundledCode = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    /**
     * TODO
     * After adding this if (!bundledCode) there is an error when we
     * create multiple code cells which needs to be fixed!
     */
    // if (!bundledCode) {
    //   createBundleCode(cell.id, cell.content);
    //   return;
    // }

    const timer: NodeJS.Timeout = setTimeout(async () => {
      createBundleCode(cell.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.id, createBundleCode, cumulativeCode]);

  return (
    <ResizableContainer direction="vertical">
      <div className="h-[calc(100%-16px)] flex flex-row">
        <ResizableContainer direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value: string) => updateCell(cell.id, value)}
          />
        </ResizableContainer>

        <div className="bg-white h-full flex flex-col items-center justify-center grow w-[20%]">
          {!bundledCode || bundledCode.loading ? (
            <div className="h-full w-full flex items-center justify-center">
              <span className="loading loading-spinner text-primary loading-xl"></span>
            </div>
          ) : (
            <CodePreview
              code={bundledCode.code}
              bundleCodeError={bundledCode.error}
            />
          )}
        </div>
      </div>
    </ResizableContainer>
  );
};

export default CodeCell;
