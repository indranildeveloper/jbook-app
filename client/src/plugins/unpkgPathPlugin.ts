import * as esbuild from "esbuild-wasm";
import axios from "axios";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // Where the file exists in the file system
      build.onResolve(
        { filter: /.*/ },
        async (
          args: esbuild.OnResolveArgs
        ): Promise<esbuild.OnResolveResult> => {
          console.log("onResolve", args);
          if (args.path === "index.js") {
            return { path: args.path, namespace: "a" };
          }

          if (args.path.includes("./") || args.path.includes("../")) {
            return {
              namespace: "a",
              path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`)
                .href,
            };
          }

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
              contents: `
              import React from "react";
              import ReactDOM from "react-dom";

              console.log(React);
              console.log(ReactDOM);
            `,
            };
          }

          const { data, request } = await axios.get(args.path);

          return {
            loader: "jsx",
            contents: data,
            resolveDir: new URL("./", request.responseURL).pathname,
          };
        }
      );
    },
  };
};
