import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer;

export const connectTestDB = async () => {
  mongoServer = await MongoMemoryServer.create({
    binary: {
      version: "4.4.18",
      // This helps if the auto-downloader picks the wrong OS version
      platform: "linux",
      arch: "x64",
    },
  });
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

export const closeTestDB = async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
};

export const clearTestDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
};
