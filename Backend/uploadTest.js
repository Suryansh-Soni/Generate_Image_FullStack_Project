import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const parsed = new URL(process.env.CLOUDINARY_URL);

cloudinary.config({
  cloud_name: parsed.hostname,
  api_key: decodeURIComponent(parsed.username),
  api_secret: decodeURIComponent(parsed.password),
});

try {
  const res = await cloudinary.api.ping();
  console.log("Ping:", res);

  const usage = await cloudinary.api.usage();
  console.log("Usage:", usage);
} catch (err) {
  console.dir(err, { depth: null });
}
