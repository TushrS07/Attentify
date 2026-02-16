import User from "../models/User.js";
import Teacher from "../models/Teacher.js";
import Subjects from "../models/Subjects.js"; // Assuming you have a Subjects model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js"; // Assuming you have a Student model

/**
 * Teacher Login Controller
 * Handles login for both returning and first-time teachers.
 */
export const loginTeacher = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the teacher already exists in the Teacher collection
        let teacher = await Teacher.findOne({ email });

        if (teacher) {
            const isMatch = bcrypt.compare(password, teacher.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid email or password" });
            }

            const tokenPayload = {
                id: teacher._id,
                email: teacher.email,
                role: "teacher",
            };

            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET , {
                expiresIn: "1d",
            });

            res.cookie("token", token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });

            if (!teacher.loggedIn) {
                return res.status(403).json({
                    message: "First-time login detected. Please reset your password.",
                    token,
                });
            }

            return res.status(200).json({
                message: "Login successful",
                token,
            });
        }
        // If not in Teacher collection, check User (first-time teachers)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: "teacher" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        return res.status(403).json({
            message: "First-time login detected. Please reset your password.",
            token,
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getTeacherProfile = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.user.id).select("-password");
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.status(200).json({ success: true, profile: teacher });
    } catch (error) {
        console.error("Get Profile Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Update Teacher Profile
export const updateTeacherProfile = async (req, res) => {
    try {
        const { name, phone, subjects, groups } = req.body;
        console.log("Update Profile Data:", req.body); // Debugging line


        const updatedTeacher = await Teacher.findByIdAndUpdate(
            req.user.id,
            { name, phone, subjects, groups },
            { new: true, runValidators: true }
        );

        console.log("Updated Teacher:", updatedTeacher); // Debugging line

        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile: updatedTeacher,
        });
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Sign in again" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const newTeacher = new Teacher({
            email: user.email,
            password: hashedPassword,
            loggedIn: true,
        });

        await newTeacher.save();

        // Optionally delete user record to prevent re-use
        // await User.deleteOne({ email });

        res.status(200).json({ message: "Password reset successful. You can now log in." });
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// subjects 

export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subjects.find();
        if (!subjects) {
            return res.status(404).json({ message: "No subjects found" });
        }
        res.status(200).json({ success: true, subjects });
    } catch (error) {
        console.error("Get Subjects Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const studentList = async (req, res) => {
    const { group } = req.query;  // Destructure the groupNumber from query parameters
    if (!group) {
        return res.status(400).json({ message: "Group number is required." }); // Return an error if no group number is provided
    }
    
    try {
        // Find students with the matching groupNumber and exclude sensitive fields (password, otpEmail, otpPhone)
        const students = await Student.find({ groupNumber: group }).select("-password -otpEmail -otpPhone");
        
        console.log("Fetched Students:", students); // Debugging line

        // If no students found
        if (students.length === 0) {
            return res.status(404).json({ message: "No students found for the given group." });
        }

        // Successfully return the students data
        res.status(200).json({ success: true, students });
    } catch (error) {
        console.error("Error fetching student list:", error);
        res.status(500).json({ message: "Server error in fetching student list." });
    }
}


