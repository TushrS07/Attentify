// attendanceRoutes.js
import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
  startAttendanceSession,
  recordAttendance,
  getAttendance,
} from '../controllers/attendanceController.js';
const router = express.Router();

// Protected routes - require authentication
router.post('/start-session', verifyToken, startAttendanceSession);
router.post('/record', verifyToken, recordAttendance);
router.get('/records', verifyToken, getAttendance);
// router.get('/test', verifyToken, test);

export default router;