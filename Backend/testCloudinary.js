import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const parsed = new URL(process.env.CLOUDINARY_URL);

cloudinary.config({
  cloud_name: parsed.hostname,
  api_key: decodeURIComponent(parsed.username),
  api_secret: decodeURIComponent(parsed.password),
  secure: true,
});

try {
  const result = await cloudinary.uploader.upload("./test.png");
  console.log(result);
} catch (err) {
  console.dir(err, { depth: null });
}