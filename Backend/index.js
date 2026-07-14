import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import express from "express";

import PostRouter from "./routes/Post.js";
import GenerateImageRouter from "./routes/GenerateImage.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is missing from the .env file");
  }

  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB connected successfully.");
};

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hello sir",
  });
});

app.use("/api/post", PostRouter);
app.use("/api/generate_image", GenerateImageRouter);
// Error handler must come after routes
app.use((err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
