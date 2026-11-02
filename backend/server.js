 
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import analysisRoutes from "./routes/analysisRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load backend/.env
const envResult = dotenv.config({
  path: path.join(__dirname, ".env")
});

if (envResult.error) {
  console.error("ENV FILE NOT FOUND:", envResult.error.message);
}

const app = express();

const geminiApiKey = process.env.GEMINI_API_KEY?.trim();

console.log("ENV FILE PATH:", path.join(__dirname, ".env"));
console.log("Gemini API Key Loaded:", Boolean(geminiApiKey && !geminiApiKey.includes("PASTE_YOUR")));

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173"
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "AI Resume Analyzer API is running" });
});

app.use("/api/analyze", analysisRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong."
  });
});

const PORT = process.env.PORT || 5000;

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      app.locals.mongoConnected = true;
      console.log("MongoDB connected");
    })
    .catch(err => {
      console.error("MongoDB connection failed:", err.message);
    });
}

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
