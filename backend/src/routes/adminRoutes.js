import express from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/authMiddleware.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import { generateCredentials } from "../controllers/adminController.js";


const router = express.Router();

router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Authorized" });
});

router.post("/generatecredentials", verifyToken, upload.single('file'), generateCredentials);

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
