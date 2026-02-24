import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { errorHandler } from "./core/errors/errorHandler";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", routes);

// Global error handler must be LAST
app.use(errorHandler);