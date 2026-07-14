import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);

    console.log("=================================");
    console.log("🍃 MongoDB Connected");
    console.log(`📦 Database: ${conn.connection.name}`);
    console.log("=================================");
  } catch (error) {
    console.error("❌ Database Connection Failed");

    if (error instanceof Error) {
      console.error(error.message);
    }

    process.exit(1);
  }
};

export default connectDB;