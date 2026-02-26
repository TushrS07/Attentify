// server.js
// ⚠️ IMPORTANT: Load environment variables FIRST before any other imports
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");

// Debug: Check if .env file exists
console.log(`[INIT] 🔍 Looking for .env at: ${envPath}`);
console.log(`[INIT] 📁 .env file exists: ${fs.existsSync(envPath)}`);

const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error(`[INIT] ❌ Error loading .env: ${result.error.message}`);
} else {
  console.log(`[INIT] ✅ Environment variables loaded from: ${envPath}`);
  console.log(`[INIT] 🔑 Sample env check - NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
  console.log(`[INIT] 🔑 Sample env check - PORT: ${process.env.PORT || 'not set'}`);
}

// Verify critical environment variables
console.log('\n[CONFIG] 🔍 Verifying configurations...');
console.log(`[CONFIG] ${process.env.CLOUDINARY_CLOUD_NAME ? '✅' : '❌'} Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME || 'NOT CONFIGURED'}`);
console.log(`[CONFIG] ${process.env.EMAIL ? '✅' : '❌'} Email: ${process.env.EMAIL || 'NOT CONFIGURED'}`);
console.log(`[CONFIG] ${process.env.TWILIO_ACCOUNT_SID ? '✅' : '❌'} Twilio: ${process.env.TWILIO_ACCOUNT_SID ? process.env.TWILIO_ACCOUNT_SID.substring(0, 10) + '...' : 'NOT CONFIGURED'}`);
console.log(`[CONFIG] ${process.env.MONGO_URI ? '✅' : '❌'} MongoDB: ${process.env.MONGO_URI ? 'Configured' : 'NOT CONFIGURED'}`);
console.log(`[CONFIG] ${process.env.JWT_SECRET ? '✅' : '❌'} JWT Secret: ${process.env.JWT_SECRET ? 'Configured' : 'NOT CONFIGURED'}\n`);

// Now import everything else AFTER env vars are loaded
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import connectDB from "./src/config/db.js";
import studentRoutes from "./src/routes/studentRoutes.js";
import teacherRoutes from "./src/routes/teacherRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import attendanceRoutes from "./src/routes/attendanceRoutes.js";

const app = express();

// Security middleware
app.use(helmet());

// JSON parser and cookie parser
app.use(express.json({limit:'50mb'}));
app.use(cookieParser());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.includes('vercel.app') || origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true
}));
//

// Routes
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/attendance", attendanceRoutes);

app.get('/test',(req,res)=> {
  res.send("Welcome to the Attendance Management System API");
})

// Start server inside async function
(async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
})();
