import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

const app = express();

// Security middleware
app.use(helmet());

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Parse JSON requests
app.use(express.json());

// Parse URL encoded data
app.use(express.urlencoded({ extended: true }));

// Compress responses
app.use(compression());

// Log HTTP requests
app.use(morgan("dev"));

// Temporary Route
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Welcome to NexMeet API 🚀",
  });
});

export default app;