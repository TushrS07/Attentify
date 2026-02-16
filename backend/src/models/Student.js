import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otpEmail: { type: String, required: true },
    otpPhone: { type: String, required: true },
    verifiedEmail: { type: Boolean, default: false },
    verifiedPhone: { type: Boolean, default: false },
    rollNumber: { type: String, required: false },
    groupNumber: { type: String, required: false },
    dob: { type: String, required: false },
    guardianName: { type: String, required: false },
    guardianPhoneNo: {
        type: String,
        required: false,
        validate: {
            validator: function (v) { return v !== this.phone; },
            message: "Guardian phone number cannot be the same as student's phone number."
        }
    },
    uploadedImageUrl: { type: String, required: false },
    capturedImageUrl: { type: String, required: false },
    profileImage: { type: String, required: false },
    liveImageVerified: { type: Boolean, default: false }
});


const Student = mongoose.model('Student', studentSchema);
export default Student;
