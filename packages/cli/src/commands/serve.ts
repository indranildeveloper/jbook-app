import path from "node:path";
import { Command } from "commander";
import { serve } from "local-api";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing.")
  .option("-p, --port <number>", "The port to run server on.", "4005")
  .action((filename: string = "notebook.js", options: { port: string }) => {
    const directory = path.join(process.cwd(), path.dirname(filename));
    serve(parseInt(options.port), path.basename(filename), directory);
  });
