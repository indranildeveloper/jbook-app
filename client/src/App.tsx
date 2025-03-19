import { FC, useState } from "react";

import CodeEditor from "./components/CodeEditor";
import CodePreview from "./components/CodePreview";
import bundleCode from "./bundler";

const App: FC = () => {
  const [inputCode, setInputCode] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handleClick = async () => {
    const outputCode = await bundleCode(inputCode);
    setCode(outputCode);
  };

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setInputCode(value)}
      />
      <div className="mb-4">
        <button onClick={handleClick} className="btn btn-primary">
          Submit
        </button>
      </div>
      <CodePreview code={code} />
    </div>
  );
};

export default App;
