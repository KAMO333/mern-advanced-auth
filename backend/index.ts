import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://advanced-auth-system-uwj9.onrender.com"
        : "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Only start the server and connect to the REAL DB if this file is run directly
// This prevents port collisions and real DB connections during Jest tests
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port:", PORT);
  });
}

export { app }; // Exporting for Supertest
