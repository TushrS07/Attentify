// src/routes/teacherRoutes.js
import express from "express";
import {
  loginTeacher,
  getTeacherProfile,
  updateTeacherProfile,
  resetPassword,
  getSubjects,
  studentList,
  logout,
} from "../controllers/teacherController.js";

import { verifyToken } from "../middlewares/authMiddleware.js"; // 🔒 Enable when ready

const router = express.Router();

// 🔓 Public Routes
router.post("/login", loginTeacher);
router.post("/reset-password", resetPassword);

// 🔒 Protected Routes (Add verifyToken middleware when auth is implemented)
router.use(verifyToken); // Enable this to protect all routes below

router.get("/subjects", getSubjects);


router.get("/allstudents", studentList);

router.get("/profile", getTeacherProfile);
router.put("/profile", updateTeacherProfile);
router.post("/logout", logout);

export default router;