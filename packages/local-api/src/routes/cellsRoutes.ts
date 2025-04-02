import fs from "fs/promises";
import * as path from "node:path";
import express, { Request, Response } from "express";

interface ICell {
  id: string;
  content: string;
  type: "text" | "code";
}

export const createCellsRouter = (fileName: string, dirname: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dirname, fileName);

  router.get("/cells", async (req: Request, res: Response) => {
    try {
      // Read the file
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      res.send(JSON.parse(result));
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        // Add code to create a file and add default cells
        await fs.writeFile(fullPath, "[]", "utf-8");
        res.send([]);
      } else {
        throw error;
      }
    }
  });

  router.post("/cells", async (req: Request, res: Response) => {
    // Take the list of cells from the req object
    // Serialize the content
    const { cells }: { cells: ICell[] } = req.body;
    // Write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    res.send({ status: "success" });
  });

  return router;
};
