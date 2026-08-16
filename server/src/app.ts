import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// ==========================
// Security Middleware
// ==========================

// Security headers
app.use(helmet());

// ==========================
// CORS
// ==========================
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// ==========================
// Request Body Limits
// ==========================
app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);

// ==========================
// Compression
// ==========================
app.use(compression());

// ==========================
// HTTP Request Logging
// ==========================
app.use(morgan("dev"));

// ==========================
// Global Rate Limiter
// ==========================
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});

app.use("/api/v1", apiLimiter);

// ==========================
// API Routes
// ==========================
app.use("/api/v1", routes);

// ==========================
// Global Error Handler
// ==========================
app.use(errorHandler);

export default app;