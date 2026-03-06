import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { errorHandler } from "./core/errors/errorHandler";
import { env } from "./config/env";

export const app = express();

app.use(helmet());

// Build allowed origins list
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5001",
  "http://localhost:3000",
];

if (env.FRONTEND_URL) {
  allowedOrigins.push(env.FRONTEND_URL.trim()); // .trim() guards against accidental spaces
}

console.log("✅ CORS allowed origins:", allowedOrigins);

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`🚫 CORS blocked request from origin: ${origin}`);
      callback(new Error(`CORS policy: origin '${origin}' is not allowed`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    allowedOrigins, // visible in production for easy debugging
  });
});

app.use("/api", routes);

// Global error handler must be LAST
app.use(errorHandler);