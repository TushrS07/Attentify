import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Start attendance session
export const startAttendanceSession = async (req, res) => {
  try {
    let { subjectId, sectionId, date, lectureSlot } = req.body;
    const teacherId = req.teacherId; // From verifyToken middleware

    // Validate required fields
    if (!subjectId || !sectionId || !lectureSlot) {
      return res.status(400).json({ message: 'Subject, section, and lecture slot are required' });
    }

    // Validate lectureSlot
    const validLectureSlots = ['1-3', '3-5', '5-8'];
    if (!validLectureSlots.includes(lectureSlot)) {
      return res.status(400).json({ message: 'Invalid lecture slot. Allowed values are 1-3, 3-5, 5-8' });
    }

    // If date is not provided, use today's date
    if (!date) {
      const today = new Date();
      date = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    }

    res.status(200).json({
      message: 'Attendance session started',
      sessionData: {
        teacherId,
        subjectId,
        sectionId,
        date,
        lectureSlot
      }
    });
  } catch (error) {
    console.error('Error starting attendance session:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Record student attendance

export const recordAttendance = async (req, res) => {
  try {
    const { studentName, sectionId, subjectId, lectureSlot } = req.body;
    const teacherId = req.user.id; // From verifyToken middleware
    console.log(studentName, sectionId, subjectId, teacherId);

    // Find student by name (rollNumber actually)
    const student = await Student.findOne({ rollNumber: studentName });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Set date boundaries for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // First, find the attendance document for today's section, subject, lecture slot
    let attendanceRecord = await Attendance.findOne({
      sectionId,
      teacherId,
      subjectId,
      lectures: lectureSlot,
      createdAt: { $gte: today, $lt: tomorrow }
    });

    // If no record exists yet, create a new one
    if (!attendanceRecord) {
      attendanceRecord = new Attendance({
        sectionId,
        teacherId,
        subjectId,
        lectures: lectureSlot,
        attendance: [],
        timestamp: new Date()
      });
    }

    // Check if this student is already in the attendance array
    const studentIndex = attendanceRecord.attendance.findIndex(
      item => item.studentId === student.rollNumber
    );

    // If student is already in the array, return existing record
    if (studentIndex !== -1) {
      return res.status(200).json({
        message: "Attendance already recorded for this student",
        attendance: attendanceRecord
      });
    }

    // Add student to attendance array and save
    attendanceRecord.attendance.push({
      studentId: student.rollNumber,
      status: "Present"
    });

    await attendanceRecord.save();

    return res.status(201).json({
      message: 'Attendance recorded successfully',
      attendance: attendanceRecord
    });

  } catch (error) {
    console.error('Error recording attendance:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get attendance records
export const getAttendance = async (req, res) => {
  try {

    const { sectionId, date, subjectId, lectures } = req.query; // Use req.query to get query parameters
    const teacherId = req.user.id; // From verifyToken middleware

    const query = { teacherId };

    if (sectionId) query.sectionId = sectionId;
    if (subjectId) query.subjectId = subjectId;

    if (lectures) query.lectures = lectures;


    if (date) {
      const selectedDate = new Date(date);

      const startOfDay = new Date(selectedDate.setUTCHours(0, 0, 0, 0));
      const endOfDay = new Date(selectedDate.setUTCHours(23, 59, 59, 999));

      query.createdAt = {
        $gte: startOfDay,
        $lte: endOfDay
      };
    }

    const attendanceRecords = await Attendance.find(query)
      // .populate('attendance.studentId', 'name rollNumber') // Populate student details
      // .sort({ createdAt: -1 }); // Sort by most recent first


    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({ message: 'No attendance records found' });
    }

    res.status(200).json({
      message: 'Attendance records retrieved',
      count: attendanceRecords.length,
      attendance: attendanceRecords
    });
  } catch (error) {
    console.error('Error getting attendance:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


