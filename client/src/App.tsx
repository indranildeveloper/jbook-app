import { FC, useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";

const App: FC = () => {
  const [inputCode, setInputCode] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const initializeEsbuildRef = useRef<boolean>(false);

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
    initializeEsbuildRef.current = true;
  };

  useEffect(() => {
    startService();
  }, []);

  const handleClick = async () => {
    if (!initializeEsbuildRef.current) return;
    const result = await esbuild.transform(inputCode, {
      loader: "jsx",
      target: "es2015",
    });

    console.log(result);
    setCode(result.code);
  };

  return (
    <div className="p-5 m-5">
      <textarea
        name="code"
        id="code"
        className="textarea mb-4"
        placeholder="Enter your code"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      ></textarea>
      <div className="mb-4">
        <button onClick={handleClick} className="btn btn-primary">
          Submit
        </button>
      </div>

      <pre className="border h-64 w-64">{code}</pre>
    </div>
  );
};

export default App;
