import express from "express";
import dotenv from "dotenv";

import connectionDB from "./database/connection.js";
connectionDB();

dotenv.config();

const app = express();
const port: string = process.env.PORT;

import type { RequestExpess, ResponseExpress } from "./types/express.ts";

app.get("/", (req: RequestExpess, res: ResponseExpress) => {
  return res.send("Express + TypeScript Server");
});

app.listen(port, (): void => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
