// Function to generate password
import User from '../models/User.js';
import xlsx from 'xlsx';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Function to generate a random password
const generatePassword = () => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
};

// Function to send email
const sendEmail = async (email, subject, text) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
};

// export const generateCredentials = (upload.single('file'), async (req, res) => {
export const generateCredentials = async (req, res) => {
    try {
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        let usersData = [];

        for (const row of data) {
            const { Email, Name, Phone } = row;
            const password = generatePassword();
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({ email: Email, name: Name, phone: Phone, password: hashedPassword });
            await user.save();
            await sendEmail(Email, 'Your Account Credentials', `Email: ${Email}\nPassword: ${password}`);

            usersData.push({ Email, Name, Phone, Password: password });
        }

        // Save the generated credentials to an Excel file
        const newWorkbook = xlsx.utils.book_new();
        const newWorksheet = xlsx.utils.json_to_sheet(usersData);
        xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, "Users");
        xlsx.writeFile(newWorkbook, "Generated_Credentials.xlsx");

        res.json({ message: 'Users created and emails sent! Credentials saved in Generated_Credentials.xlsx' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
