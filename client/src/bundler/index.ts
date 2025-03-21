import * as esbuild from "esbuild-wasm";
import { fetchPlugin, unpkgPathPlugin } from "./plugins";

let isInitialized: boolean = false;

const bundleCode = async (rawCode: string): Promise<string> => {
  if (!isInitialized) {
    await esbuild.initialize({
      worker: true,
      // TODO: Make this a environment variable
      wasmURL: "https://unpkg.com/esbuild-wasm@0.25.1/esbuild.wasm",
    });
    isInitialized = true;
  }

  const result = await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      "process.env.NODE_ENV": '"production"',
      global: "window",
    },
  });

  return result.outputFiles[0].text;
};

export default bundleCode;
