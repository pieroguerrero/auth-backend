import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDatabase = () => {
  const mongoDB =
    process.env.MONGODB_URI || "No Database connection string provided";

  mongoose
    .connect(mongoDB)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log("DB Connection ERROR:", error));
};

export { connectToDatabase };
