import Post from "../models/Post.js";
import dotenv from "dotenv";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// Read credentials from CLOUDINARY_URL
const cloudinaryUrl = process.env.CLOUDINARY_URL?.trim();

if (!cloudinaryUrl) {
  throw new Error("CLOUDINARY_URL is missing");
}

const parsedUrl = new URL(cloudinaryUrl);

console.log("CLOUDINARY_URL:", process.env.CLOUDINARY_URL);

console.log({
  cloud_name: parsedUrl.hostname,
  api_key: decodeURIComponent(parsedUrl.username),
  api_secret: decodeURIComponent(parsedUrl.password).substring(0, 5) + "...",
});

cloudinary.config({
  cloud_name: parsedUrl.hostname,
  api_key: decodeURIComponent(parsedUrl.username),
  api_secret: decodeURIComponent(parsedUrl.password),
  secure: true,
});

export const getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.find({});

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Get posts error:", error);

    return next(
      createError(
        error.status || 500,
        error.message || "Failed to fetch posts",
      ),
    );
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { name, prompt, photo } = req.body;

    if (!name?.trim() || !prompt?.trim() || !photo) {
      return next(createError(400, "Name, prompt and photo are required"));
    }

    console.log("Creating post...");
    console.log("Photo length:", photo.length);
    console.log("Photo start:", photo.slice(0, 30));

    // Remove: data:image/png;base64,
    const base64Data = photo.replace(
      /^data:image\/[a-zA-Z0-9.+-]+;base64,/,
      "",
    );

    const imageBuffer = Buffer.from(base64Data, "base64");

    const uploadResult = await cloudinary.uploader.upload(photo, {
      folder: "ai-generated-images",
    });

    console.log(uploadResult.secure_url);

    console.log("Cloudinary upload successful:", uploadResult.secure_url);

    const newPost = await Post.create({
      name: name.trim(),
      prompt: prompt.trim(),
      photo: uploadResult.secure_url,
    });

    return res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (error) {
    console.log("=== ERROR KEYS ===");
    console.log(Object.keys(error));

    console.log("=== ERROR ===");
    console.dir(error, { depth: null });

    if (error.response) {
      console.log("=== RESPONSE ===");
      console.dir(error.response, { depth: null });
    }

    if (error.body) {
      console.log("=== BODY ===");
      console.dir(error.body, { depth: null });
    }

    return next(
      createError(
        error.http_code || error.status || 500,
        error.message || "Failed to create post",
      ),
    );
  }
};
