import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const initializeMongoTestingServer = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  try {
    await mongoose.connect(mongoUri);
    console.log("In-memory Database connected:");
  } catch (error) {
    console.log("In-memory Database connection ERROR:", error);
  }
};

export { initializeMongoTestingServer };
