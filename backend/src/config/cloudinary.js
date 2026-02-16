import { v2 as cloudinary } from "cloudinary";

// Lazy initialization - configure when first used, not at import time
let isConfigured = false;

const ensureConfigured = () => {
  if (!isConfigured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    isConfigured = true;
    console.log(`[CONFIG] ☁️ Cloudinary configured: ${process.env.CLOUDINARY_CLOUD_NAME}`);
  }
};

// Create a proxy that ensures config before any operation
const cloudinaryProxy = new Proxy(cloudinary, {
  get(target, prop) {
    ensureConfigured();
    return target[prop];
  }
});

export default cloudinaryProxy;