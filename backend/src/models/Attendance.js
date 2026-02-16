import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    attendance: [{
        studentId: { type: String, required: true },
        status: { type: String, enum: ["Present", "Absent"], required: true },
    }],
    sectionId: { type: String, required: true },
    teacherId: { type: String, required: true },
    subjectId: { type: String, required: true },
    lectures: { type: String, enum: ["1-3", "3-5", "5-8"], required: true },
    // date: { type: Date, required: true },
}, {timestamps: true});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;