import { FC, useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkgPathPlugin";

const App: FC = () => {
  const [inputCode, setInputCode] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const initializeEsbuildRef = useRef<boolean>(false);
  const initializeAppRef = useRef<boolean>(false);

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "/esbuild.wasm",
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
      plugins: [unpkgPathPlugin(inputCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    setCode(result.outputFiles[0].text);
  };

  return (
    <div className="p-5 m-5">
      <textarea
        name="code"
        id="code"
        className="textarea mb-4 w-full h-64"
        placeholder="Enter your code"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      ></textarea>
      <div className="mb-4">
        <button onClick={handleClick} className="btn btn-primary">
          Submit
        </button>
      </div>

      <pre>{code}</pre>
    </div>
  );
};

export default App;
