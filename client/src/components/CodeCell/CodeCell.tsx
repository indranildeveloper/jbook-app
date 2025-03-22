import { FC, useState, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import CodePreview from "./CodePreview";
import ResizableContainer from "../Resize/ResizableContainer";
import bundleCode from "../../bundler";

const CodeCell: FC = () => {
  const [inputCode, setInputCode] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [bundleCodeError, setBundleCodeError] = useState<string>("");

  useEffect(() => {
    const timer: number = setTimeout(async () => {
      const outputCode = await bundleCode(inputCode);
      setCode(outputCode.code);
      setBundleCodeError(outputCode.error);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [inputCode]);

  return (
    <ResizableContainer direction="vertical">
      <div className="flex h-full flex-row">
        <ResizableContainer direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value: string) => setInputCode(value)}
          />
        </ResizableContainer>
        <CodePreview code={code} bundleCodeError={bundleCodeError} />
      </div>
    </ResizableContainer>
  );
};

export default CodeCell;
