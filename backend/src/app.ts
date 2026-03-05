import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { errorHandler } from "./core/errors/errorHandler";
import { env } from "./config/env";

export const app = express();

app.use(helmet());

// CORS configuration for production
const corsOptions = {
  origin: env.FRONTEND_URL
    ? [env.FRONTEND_URL, "http://localhost:5173", "http://localhost:5001"]
    : "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api", routes);

// Global error handler must be LAST
app.use(errorHandler);
