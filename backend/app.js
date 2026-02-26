// server.js
// ⚠️ IMPORTANT: Load environment variables FIRST before any other imports
import dotenv from "dotenv";
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


app.get('/test2',(req,res)=> {
  res.send("Welcome to the ..................... Attendance Management System API");
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
