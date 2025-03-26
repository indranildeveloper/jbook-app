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
    /**
     * TODO,
     * After adding this if (!bundledCode) there is an error when we
     * create multiple code cells which needs to be fixed!
     */
    // if (!bundledCode) {
    //   createBundleCode(cell.id, cell.content);
    //   return;
    // }

    const timer: number = setTimeout(async () => {
      createBundleCode(cell.id, cell.content);
    }, 750);

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

        <div className="bg-white h-full grow">
          {!bundledCode || bundledCode.loading ? (
            <div className="h-full w-full flex items-center justify-center animate-fadeIn">
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
