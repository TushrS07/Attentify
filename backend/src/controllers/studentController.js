// Regenerate OTP for email
import Student from "../models/Student.js";

// In-memory OTP resend cooldown (60 seconds per email/phone)
const OTP_COOLDOWN_MS = 60 * 1000;
const otpLastSent = new Map();
import bcrypt from "bcryptjs";
import generateOTP from "../services/otpService.js";
import transporter from "../config/email.js";
import twilioClient from "../config/sms.js";
import jwt from "jsonwebtoken";
import { validateStudent } from "../validation/studentValidation.js";
import cloudinary from "../config/cloudinary.js";
import { studentList } from "./teacherController.js";

export const registerStudent = async (req, res) => {
  try {
    console.log(`[REGISTER] 📝 Registration attempt for email: ${req.body.email}`);
    
    // Validate user input
    const validationErrors = validateStudent(req.body);
    if (validationErrors) {
      console.log(`[REGISTER] ❌ Validation errors: ${validationErrors.join(", ")}`);
      return res.status(400).json({ message: validationErrors.join(", ") });
    }

    const { name, phone, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password do not match" });
    }

    // Check if user already exists
    const existingStudent = await Student.findOne({ $or: [{ email }, { phone }] });
    if (existingStudent) {
      console.log(`[REGISTER] ❌ Email or phone already exists: ${email}`);
      return res.status(409).json({ message: "Email or phone already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const otpEmail = generateOTP();
    const otpPhone = generateOTP();

    // Save new student
    const student = new Student({
      name,
      phone,
      email,
      password: hashedPassword,
      otpEmail,
      otpPhone,
    });
    await student.save();

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otpEmail}`,
    });

    // Send OTP via SMS

    //************* Twilio service down will replace with another **************/
    // await twilioClient.messages.create({
    //   body: `Your OTP is ${otpPhone}`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   // to: `+91${phone}`,
    //   to: `+918146786435`,
    // });

    // Generate token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set secure cookies for cross-origin (production)
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      //domain: "trycloudflare.com",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/"
    };

    res.cookie("token", token, cookieOptions);

    res.cookie("email", email, {
      ...cookieOptions,
      maxAge: 10 * 60 * 1000,
    });

    res.cookie("phone", phone, {
      ...cookieOptions,
      maxAge: 10 * 60 * 1000,
    });

    console.log(`[REGISTER] ✅ Student registered successfully: ${email}, ID: ${student._id}`);
    console.log(`[REGISTER] 🍪 Cookies set - token, email, phone`);

    res.status(201).json({
      message: "OTP sent successfully. User registered and logged in.",
      token,
    });
  } catch (error) {
    console.error("Error during student registration:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};

export const regenerate_OTP_Mail = async (req, res) => {
  try {
    const studentEmail = req.cookies.email;

    if (!studentEmail) {
      return res.status(400).json({ message: "Email not found in cookies" });
    }

    const lastSent = otpLastSent.get(`email:${studentEmail}`);
    if (lastSent && Date.now() - lastSent < OTP_COOLDOWN_MS) {
      const waitSeconds = Math.ceil((OTP_COOLDOWN_MS - (Date.now() - lastSent)) / 1000);
      return res.status(429).json({ message: `Please wait ${waitSeconds}s before requesting another OTP.` });
    }

    const otpEmail = generateOTP();

    const result = await Student.updateOne({ email: studentEmail }, { otpEmail });
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Student not found." });
    }

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: studentEmail,
      subject: "Your OTP Code",
      text: `Your OTP is ${otpEmail}`,
    });

    otpLastSent.set(`email:${studentEmail}`, Date.now());
    res.json({ message: "New OTP sent successfully to email." });
  } catch (error) {
    console.error("Error during OTP regeneration for email:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};

// Regenerate OTP for phone
export const regenerate_OTP_Phone = async (req, res) => {
  try {
    const studentPhone = req.cookies.phone;

    if (!studentPhone) {
      return res.status(400).json({ message: "Phone not found in cookies" });
    }

    const lastSent = otpLastSent.get(`phone:${studentPhone}`);
    if (lastSent && Date.now() - lastSent < OTP_COOLDOWN_MS) {
      const waitSeconds = Math.ceil((OTP_COOLDOWN_MS - (Date.now() - lastSent)) / 1000);
      return res.status(429).json({ message: `Please wait ${waitSeconds}s before requesting another OTP.` });
    }

    const otpPhone = generateOTP();

    const result = await Student.updateOne({ phone: studentPhone }, { otpPhone });
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Student not found." });
    }

    await twilioClient.messages.create({
      body: `Your OTP is ${otpPhone}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${studentPhone}`,
    });

    otpLastSent.set(`phone:${studentPhone}`, Date.now());
    res.json({ message: "New OTP sent successfully to phone." });
  } catch (error) {
    console.error("Error during OTP regeneration for phone:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};

// Verify Email OTP
export const verifyEmailOtp = async (req, res) => {
  try {
    const studentEmail = req.cookies.email;
    const { emailOtp } = req.body;
    console.log(`[OTP] 📧 Email OTP verification attempt for: ${studentEmail}`);

    const student = await Student.findOne({ email: studentEmail });
    if (!student || student.otpEmail !== emailOtp) {
      console.log(`[OTP] ❌ Invalid email OTP for: ${studentEmail}`);
      return res.status(400).json({ message: "Invalid Email OTP. Please try again." });
    }

    console.log(`[OTP] ✅ Email OTP verified for: ${studentEmail}`);

    student.verifiedEmail = true;
    await student.save();

    if (student.verifiedEmail && student.verifiedPhone) {
      res.cookie("studentSession", student._id.toString(), {
        httpOnly: true,
        secure: true,
        //domain: "trycloudflare.com",
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/"
      });
      return res.json({
        message: "Both OTPs verified. Redirecting...",
        studentId: student._id,
        redirect: "/studentregister2",
      });
    }

    res.json({ message: "Email OTP verified. Awaiting phone verification." });
  } catch (error) {
    console.error("Error during email OTP verification:", error);
    res.status(500).json({ message: "Server error during email OTP verification." });
  }
};

// Verify Phone OTP
export const verifyPhoneOtp = async (req, res) => {
  try {
    const studentEmail = req.cookies.email;
    const { phoneOtp } = req.body;
    console.log(`[OTP] 📱 Phone OTP verification attempt for: ${studentEmail}`);

    const student = await Student.findOne({ email: studentEmail });

    if (!student || student.otpPhone !== phoneOtp) {
      console.log(`[OTP] ❌ Invalid phone OTP for: ${studentEmail}`);
      return res.status(400).json({ message: "Invalid phone OTP. Please try again." });
    }

    console.log(`[OTP] ✅ Phone OTP verified for: ${studentEmail}`);

    student.verifiedPhone = true;
    await student.save();

    if (student.verifiedEmail && student.verifiedPhone) {
      res.cookie("studentSession", student._id.toString(), {
        httpOnly: true,
        secure: true,
        //domain: "trycloudflare.com",
        sameSite:"none",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/"
      });
      return res.json({
        message: "Both OTPs verified. Redirecting...",
        studentId: student._id,
        redirect: "/studentregister2",
      });
    }

    res.json({ message: "Phone OTP verified. Awaiting email verification." });
  } catch (error) {
    console.error("Error during phone OTP verification:", error);
    res.status(500).json({ message: "Server error during phone OTP verification." });
  }
};

export const saveStudentDetails = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log(`[PROFILE] ❌ No token provided for profile update`);
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const studentId = decoded.id;

    console.log(`[PROFILE] 📝 Profile update attempt for user ID: ${studentId}`);

    // Extract profile fields from request body
    const {
      rollNumber,
      groupNumber,
      dob,
      guardianName,
      guardianPhoneNo,
    } = req.body;

    console.log(`[PROFILE] Request body:`, req.body);

    // Find the existing student by ID
    const existingStudent = await Student.findById(studentId);

    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update only the profile fields, leaving authentication fields untouched
    const updateData = {
      rollNumber: rollNumber || existingStudent.rollNumber,
      groupNumber: groupNumber || existingStudent.groupNumber,
      dob: dob || existingStudent.dob,
      guardianName: guardianName || existingStudent.guardianName,
      guardianPhoneNo: guardianPhoneNo || existingStudent.guardianPhoneNo,
    };

    // Update the student record
    const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData);

    console.log(`[PROFILE] ✅ Profile updated successfully for user ID: ${studentId}`);

    return res.status(200).json({
      success: true,
      message: "Profile details updated successfully.",
      student: updatedStudent
    });
  } catch (error) {
    console.error("Error updating student profile:", error);
    return res.status(500).json({
      message: "Server error in updating profile details.",
      error: error.message
    });
  }
};


// 📌 Fetch All Student Details (Post-Login)
export const allDetailsStudent = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log(`[DETAILS] ❌ No token provided`);
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`[DETAILS] 📋 Fetching details for user ID: ${decoded.id}`);
    
    const student = await Student.findById(decoded.id).select("-password -otpEmail -otpPhone -verifiedEmail -verifiedPhone");
    
    if (!student) {
      console.log(`[DETAILS] ❌ Student not found for ID: ${decoded.id}`);
      return res.status(404).json({ message: "Student not found" });
    }

    console.log(`[DETAILS] ✅ Details fetched for: ${student.email}`);

    res.status(200).json({ success: true, student });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ message: "Server error in fetching details." });
  }
};


// 📌 Login Handler
export const login = async (req, res) => {
  try {
    console.log(`[LOGIN] 🔐 Login attempt for email: ${req.body.email}`);
    const { email, password } = req.body;
    const user = await Student.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log(`[LOGIN] ❌ Invalid credentials for: ${email}`);
      return res.status(400).json({ error: "Invalid email or password" });
    }

    console.log(`[LOGIN] ✅ User found: ${email}, ID: ${user._id}`);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Updated cookie settings for cross-origin
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,  
      //domain: "trycloudflare.com",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,  // 1 day in milliseconds
      path: '/'
    });

    console.log(`[LOGIN] 🍪 Token cookie set for user: ${user._id}`);

    // Step-based redirects
    if (!user.otpEmail || !user.otpPhone) {
      console.log(`[LOGIN] ⚠️ User needs OTP verification: ${email}`);
      return res.status(401).json({ message: "Verify OTP", token });
    }

    if (
      !user.rollNumber ||
      !user.dob ||
      !user.groupNumber ||
      !user.guardianName ||
      !user.guardianPhoneNo
    ) {
      console.log(`[LOGIN] ⚠️ Incomplete profile for user: ${email}`);
      return res.status(400).json({ message: "Fill all the details", token });
    }

    console.log(`[LOGIN] ✅ Login successful for: ${email}`);

    // Return user data along with token
    res.status(200).json({ 
      message: "Login successful", 
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        rollNumber: user.rollNumber
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};


export const getAttendance = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findById(decoded.id).select("attendance");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ success: true, attendance: student.attendance });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Server error in fetching attendance." });
  }
}



// 📌 Logout Handler
export const logout = async (req, res) => {
  console.log(`[LOGOUT] 🚪 User logging out`);
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    //domain: "trycloudflare.com",
    sameSite: "none",
    path: "/"
  });
  console.log(`[LOGOUT] ✅ Token cookie cleared`);
  res.json({ message: "Logged out successfully" });
};

// handle image upload

export const uploadImage = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      console.log(`[IMAGE] ❌ No token provided for image upload`);
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    console.log(`[IMAGE] 📸 Image upload attempt for user ID: ${id}`);

    const { image } = req.body;

    if (!image) {
      console.log(`[IMAGE] ❌ No image data provided`);
      return res.status(400).json({ message: "Image is required" });
    }

    // Get student to retrieve rollNumber
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // public_id will be SAME for every upload of this student
    const publicId = `students/${id}_captured`;
    
    console.log(`[IMAGE] ☁️ Uploading to Cloudinary with public_id: ${publicId}`);
    const result = await cloudinary.uploader.upload(image, {
      public_id: publicId,
      overwrite: true,    // ✅ ensures single image per rollNumber
      invalidate: true,   // ✅ invalidate cached versions
    });

    const url = result.secure_url;

    if (!url) {
      console.log(`[IMAGE] ❌ Cloudinary upload failed - no URL returned`);
      return res.status(400).json({ message: "Server error, Please upload again." });
    }

    console.log(`[IMAGE] ✅ Image uploaded to Cloudinary: ${url}`);

    // Save image URL to database
    await Student.findByIdAndUpdate(id, { uploadedImageUrl: url });
    console.log(`[IMAGE] 💾 Image URL saved to database for user: ${id}`);

    // Notify Python face recognition service to add this face
    if (student.rollNumber) {
      try {
        const pythonServiceUrl = process.env.FACE_RECOGNITION_URL || 'http://localhost:5006';
        console.log(`[IMAGE] 🤖 Registering face with Python service for roll: ${student.rollNumber}`);
        await fetch(`${pythonServiceUrl}/add-face`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rollNumber: student.rollNumber,
            imageUrl: url
          })
        });
        console.log(`[IMAGE] ✅ Face registered successfully for roll: ${student.rollNumber}`);
      } catch (faceError) {
        // Don't fail the upload if face service is unavailable
        console.warn(`[IMAGE] ⚠️ Face recognition service unavailable: ${faceError.message}`);
      }
    }

    return res.json({
      message: "Upload successful",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return res.status(500).json({
      message: "Failed to upload image",
      error: error.message,
    });
  }
}



// 📌 Save Image URLs (Step 4)
export const saveImageUrl = async (req, res) => {
  try {
    const { uploadedImageUrl, capturedImageUrl } = req.body;
    const email = req.cookies.email;

    if (!uploadedImageUrl || !capturedImageUrl) {
      return res.status(400).json({ message: "Upload or capture missing." });
    }

    const user = await Student.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found. Please login again." });
    }

    user.uploadedImageUrl = uploadedImageUrl;
    user.capturedImageUrl = capturedImageUrl;
    await user.save();

    res.status(200).json({ message: "Image URLs saved successfully." });
  } catch (error) {
    console.error("Error saving image URLs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};