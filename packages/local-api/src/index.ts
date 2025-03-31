import * as path from "node:path";
import express, { Application, Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export const serve = (port: number, filename: string, dir: string) => {
  const app: Application = express();

  const packagePath: string = require.resolve("local-client/dist/index.html");
  app.use(express.static(path.dirname(packagePath)));

  // app.use(
  //   createProxyMiddleware<Request, Response>({
  //     target: "http://[::1]:3000",
  //     ws: true,
  //     changeOrigin: true,
  //   })
  // );

  return new Promise<void>((resolve, reject) => {
    app.listen(port, () => resolve()).on("error", reject);
  });
};
