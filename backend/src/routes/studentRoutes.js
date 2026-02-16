// src/routes/studentRoutes.js

import express from "express";
import multer from "multer";
import {
  registerStudent,
  regenerate_OTP_Mail,
  regenerate_OTP_Phone,
  verifyEmailOtp,
  verifyPhoneOtp,
  saveStudentDetails,
  allDetailsStudent,
  login,
  saveImageUrl,
  getAttendance,
  uploadImage
} from "../controllers/studentController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

/**
 * Auth & Registration
 */
router.post("/register", registerStudent);
router.post("/login", login);


/**
 * OTP Verification
 */
router.post("/verify-email-otp", verifyEmailOtp);
router.post("/verify-phone-otp", verifyPhoneOtp);
router.post("/resend-email-otp", regenerate_OTP_Mail);
router.post("/resend-phone-otp", regenerate_OTP_Phone);


/**
 * Student Details
 */
router.post("/details", verifyToken, saveStudentDetails);
router.put("/details", verifyToken, saveStudentDetails);
router.get("/details", verifyToken, allDetailsStudent);


router.get("/attendance", verifyToken, getAttendance);

/**
 * Image Upload (if you're uploading images with multer)
 */

router.post("/upload-image", verifyToken, uploadImage)
router.post("/saveimageurl", verifyToken, saveImageUrl);

/**
 * Verify Protected Route
 */
router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Access granted to protected route" });
});


/**
 * Logout
*/
router.post("/logout", (req,res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // change to true in production (HTTPS)
  });

  return res.status(200).json({ message: "Logged out successfully" });
});

export default router;
