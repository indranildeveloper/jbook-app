import path from "node:path";
import { Command } from "commander";
import { serve } from "local-api";
import { isLocalAPIError } from "../utils";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing.")
  .option("-p, --port <number>", "The port to run server on.", "4005")
  .action(
    async (filename: string = "notebook.js", options: { port: string }) => {
      try {
        const directory = path.join(process.cwd(), path.dirname(filename));
        await serve(parseInt(options.port), path.basename(filename), directory);
        console.log(
          `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
        );
      } catch (error: unknown) {
        if (isLocalAPIError(error)) {
          if (error.code === "EADDRINUSE") {
            console.error(
              "The specified port is in use! Try running on a different port. Please use the -p or --port argument. For more information use the --help command."
            );
          } else if (error instanceof Error) {
            console.log("Here is the problem: ", error.message);
          } else {
            console.log("Server did not respond!", error);
          }
        }
        process.exit(1);
      }
    }
  );
