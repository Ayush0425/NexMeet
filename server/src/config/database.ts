import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error(
        "MONGO_URI is not defined in environment variables"
      );
    }

    const connection = await mongoose.connect(
      mongoURI
    );

    console.log("=================================");
    console.log("🍃 MongoDB Connected");
    console.log(
      `📦 Database: ${connection.connection.name}`
    );
    console.log("=================================");
  } catch (error) {
    console.error(
      "❌ Database Connection Failed"
    );

    if (error instanceof Error) {
      console.error(error.message);
    }

    process.exit(1);
  }
};

export default connectDB;