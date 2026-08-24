import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import connectDB from "./config/database";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log("=================================");
      console.log(" NexMeet Server Started");
      console.log(` Running on port ${PORT}`);
      console.log("=================================");
    });
  } catch (error) {
    console.error("❌ Server Startup Failed");

    if (error instanceof Error) {
      console.error(error.message);
    }

    process.exit(1);
  }
};

startServer();