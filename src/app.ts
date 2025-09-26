import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("GYM start!");
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
