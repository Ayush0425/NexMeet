import dotenv from "dotenv";
dotenv.config();

console.log("MONGO_URI =", process.env.MONGO_URI); // 👈 Add it here

import app from "./app";
import connectDB from "./config/database";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log("=================================");
    console.log("🚀 NexMeet Server Started");
    console.log(`🌐 Running on http://localhost:${PORT}`);
    console.log("=================================");
  });
};

startServer();