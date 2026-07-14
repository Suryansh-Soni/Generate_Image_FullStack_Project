import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
import { createError } from "../error.js";

dotenv.config();

const client = new InferenceClient(process.env.HF_TOKEN);

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt?.trim()) {
      return next(createError(400, "Prompt is required"));
    }

    const imageBlob = await client.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: prompt.trim(),
    });

    const arrayBuffer = await imageBlob.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    return res.status(200).json({
      success: true,
      photo: base64Image,
      mimeType:  "image/png",
    });
  } catch (error) {
    console.error("Hugging Face error:", error);

    return next(
      createError(
        error.status || 500,
        error.message || "Failed to generate image",
      ),
    );
  }
};
