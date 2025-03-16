import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const unpkgPathPlugin = (inputCode: string) => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // onResolve -> Where the file exists in the file system

      // Handle root entry file of 'index.js'
      build.onResolve(
        { filter: /(^index\.js$)/ },
        (): esbuild.OnResolveResult => {
          return { path: "index.js", namespace: "a" };
        }
      );
      // Handle relative paths in a module
      build.onResolve(
        { filter: /^\.+\// },
        (args: esbuild.OnResolveArgs): esbuild.OnResolveResult => {
          return {
            namespace: "a",
            path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`)
              .href,
          };
        }
      );
      // Handle main file of a module
      build.onResolve(
        { filter: /.*/ },
        async (
          args: esbuild.OnResolveArgs
        ): Promise<esbuild.OnResolveResult> => {
          return {
            namespace: "a",
            path: `https://unpkg.com/${args.path}`,
          };
        }
      );
      // Load the contents of the file
      build.onLoad(
        { filter: /.*/ },
        async (args: esbuild.OnLoadArgs): Promise<esbuild.OnLoadResult> => {
          console.log("onLoad", args);

          if (args.path === "index.js") {
            return {
              loader: "jsx",
              contents: inputCode,
            };
          }

          const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
            args.path
          );

          if (cachedResult) {
            return cachedResult;
          }

          const { data, request } = await axios.get(args.path);

          const result: esbuild.OnLoadResult = {
            loader: "jsx",
            contents: data,
            resolveDir: new URL("./", request.responseURL).pathname,
          };

          await fileCache.setItem(args.path, result);

          return result;
        }
      );
    },
  };
};
