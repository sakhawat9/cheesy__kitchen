import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import streamifier from "streamifier";
import { requireAdmin } from "../../../utils/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = { api: { bodyParser: false } };

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    // The old handler accepted any file of any size and streamed it straight
    // to Cloudinary.
    if (!/^image\/(jpeg|png|webp|gif|avif)$/.test(file.mimetype)) {
      callback(new Error("Only JPEG, PNG, WebP, GIF and AVIF images are accepted"));
      return;
    }
    callback(null, true);
  },
});

/** Runs a connect-style middleware as a promise, replacing next-connect. */
function run(req, res, middleware) {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result) =>
      result instanceof Error ? reject(result) : resolve(result),
    );
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  // The old handler used `isAuth`, so any signed-in customer could upload to
  // the restaurant's Cloudinary account.
  const auth = requireAdmin(req, res);
  if (!auth) return undefined;

  if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY) {
    return res.status(503).json({ message: "Image uploads aren't configured" });
  }

  try {
    await run(req, res, upload.single("file"));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  if (!req.file) return res.status(400).json({ message: "No file was uploaded" });

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "cheesy-kitchen" },
        (error, uploaded) => (uploaded ? resolve(uploaded) : reject(error)),
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    return res.status(200).json({ url: result.secure_url, publicId: result.public_id });
  } catch (error) {
    // Previously an upload failure rejected an un-awaited promise and crashed
    // the route with an unhandled rejection.
    console.error("upload: cloudinary failed", error?.message);
    return res.status(502).json({ message: "The image upload failed" });
  }
}
