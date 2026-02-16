import express from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import { generateCredentials } from "../controllers/adminController.js";


const router = express.Router();

router.post("/generatecredentials", upload.single('file'), generateCredentials);

export default router;
