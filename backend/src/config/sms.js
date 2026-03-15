import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config(); // Load .env variables

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

let twilioClient;

if (accountSid && accountSid.startsWith("AC") && authToken) {
  try {
    twilioClient = twilio(accountSid, authToken);
    console.log("[CONFIG] ✅ Twilio Client initialized");
  } catch (error) {
    console.error("[CONFIG] ❌ Twilio Initialization Failed:", error.message);
  }
} else {
  console.warn("[CONFIG] ⚠️ Twilio credentials missing or invalid. SMS service will be disabled.");
}

export default twilioClient;
