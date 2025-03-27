import express, { Application } from "express";

export const serve = (port: number, filename: string, dir: string) => {
  const app: Application = express();

  return new Promise<void>((resolve, reject) => {
    app.listen(port, () => resolve()).on("error", reject);
  });
};
