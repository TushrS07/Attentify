import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false }, // Store hashed password
    name: { type: String, required: false },
    phone: { type: String, required: false, unique: true },
    subjects: [{ type: String, required: false }], // List of subjects they teach
    groups: [{ type: String }], // Sections they handle
    profileImage: { type: String, required: false }, // Profile picture
    loggedIn: { type: Boolean, default: false } // Verification status
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
