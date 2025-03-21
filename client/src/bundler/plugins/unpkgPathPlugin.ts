import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
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
    },
  };
};
