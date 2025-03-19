import { FC, useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkgPathPlugin";
import { fetchPlugin } from "./plugins/fetchPlugin";
import CodeEditor from "./components/CodeEditor";
import CodePreview from "./components/CodePreview";

const App: FC = () => {
  const [inputCode, setInputCode] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const initializeEsbuildRef = useRef<boolean>(false);
  const initializeAppRef = useRef<boolean>(false);

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      // TODO: Make this a environment variable
      wasmURL: "https://unpkg.com/esbuild-wasm@0.25.1/esbuild.wasm",
    });
    initializeEsbuildRef.current = true;
  };

  useEffect(() => {
    /**
     * * This extra ref is used to prevent the useEffect running twice in
     * * React Strict Mode
     */
    if (!initializeAppRef.current) {
      startService();
      initializeAppRef.current = true;
    }
  }, []);

  const handleClick = async () => {
    if (!initializeEsbuildRef.current) return;

    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(inputCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    setCode(result.outputFiles[0].text);
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
