import config from "./config";
import mongoose from "mongoose";

const connectToDatabase = () => {
  const mongoDB = config.DBConnectionString;

  mongoose
    .connect(mongoDB)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log("DB Connection ERROR:", error));
};

export { connectToDatabase };
