import config from "./envConfig";
import mongoose from "mongoose";

const connectToDatabase = () => {
  const mongoDB = config.DBConnectionString;

  mongoose
    .connect(mongoDB)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log("DB connection ERROR:", error));
};

export { connectToDatabase };
