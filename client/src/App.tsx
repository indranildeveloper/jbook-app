import { FC, useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkgPathPlugin";
import { fetchPlugin } from "./plugins/fetchPlugin";
import CodeEditor from "./components/CodeEditor";

const App: FC = () => {
  const [inputCode, setInputCode] = useState<string>("");
  const initializeEsbuildRef = useRef<boolean>(false);
  const initializeAppRef = useRef<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

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

    iframeRef.current!.srcdoc = html;

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

    iframeRef.current?.contentWindow?.postMessage(
      result.outputFiles[0].text,
      "*"
    );
  };

  // TODO: Serve HTML from a different server endpoint
  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener("message", (event) => {
            try{
              eval(event.data);
            } catch (error) {
              const root = document.querySelector("#root");
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error:</h4>' + error + '</div>';
              console.error(error);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  return (
    <div className="p-5 m-5">
      <CodeEditor
        initialValue={inputCode}
        onChange={(value) => setInputCode(value)}
      />
      {/* <textarea
        name="code"
        id="code"
        className="textarea textarea-primary textarea-xl font-mono mb-4 w-full h-64"
        placeholder="Enter your code"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      ></textarea> */}
      <div className="mb-4">
        <button onClick={handleClick} className="btn btn-primary">
          Submit
        </button>
      </div>
      <iframe
        title="preview"
        ref={iframeRef}
        srcDoc={html}
        sandbox="allow-scripts"
        className="border w-full"
      />
    </div>
  );
};

export default App;
