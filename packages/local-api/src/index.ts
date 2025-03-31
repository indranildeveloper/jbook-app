import * as path from "node:path";
import express, { Application, Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { createCellsRouter } from "./routes/cellsRoutes";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean,
) => {
  const app: Application = express();

  if (useProxy) {
    app.use(
      createProxyMiddleware<Request, Response>({
        target: "http://[::1]:3000",
        ws: true,
        changeOrigin: true,
      }),
    );
  } else {
    const packagePath: string = require.resolve("local-client/dist/index.html");
    app.use(express.static(path.dirname(packagePath)));
  }

  app.use(createCellsRouter(filename, dir));

  return new Promise<void>((resolve, reject) => {
    app.listen(port, () => resolve()).on("error", reject);
  });
};
