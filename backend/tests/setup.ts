import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;

export const connectTestDB = async (): Promise<void> => {
  // Check if we are already connected to avoid re-initializing
  if (mongoose.connection.readyState === 1) return;

  mongoServer = await MongoMemoryServer.create({
    binary: {
      version: "4.4.18",
      platform: "linux",
      arch: "x64",
    },
    instance: {
      dbName: "auth_test",
    },
  });
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

export const closeTestDB = async (): Promise<void> => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
};

export const clearTestDB = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 1) return;

  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
