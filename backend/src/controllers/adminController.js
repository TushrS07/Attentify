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

export const generateCredentials = async (req, res) => {
    try {
        // Validate file exists
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Read Excel file
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        
        if (!sheetName) {
            return res.status(400).json({ error: 'Excel file is empty' });
        }

        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (!data || data.length === 0) {
            return res.status(400).json({ error: 'No data found in Excel file' });
        }

        let usersData = [];
        let errors = [];

        for (let i = 0; i < data.length; i++) {
            try {
                const row = data[i];
                console.log(`Processing row ${i + 1}:`, row);
                
                // Handle different column name variations
                const email = row.Email || row.email || row.EMAIL;
                const name = row.Name || row.name || row.NAME;
                const phone = row.Phone || row.phone || row.PHONE;

                // Validate required fields
                if (!email || String(email).trim() === '') {
                    errors.push(`Row ${i + 1}: Missing or empty email address`);
                    continue;
                }
                
                if (!name || String(name).trim() === '') {
                    errors.push(`Row ${i + 1}: Missing or empty name`);
                    continue;
                }

                // Check if user already exists
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    errors.push(`Row ${i + 1}: User with email ${email} already exists`);
                    continue;
                }

                const password = generatePassword();
                const hashedPassword = await bcrypt.hash(password, 10);

                const user = new User({ 
                    email: String(email).trim().toLowerCase(), 
                    name: String(name).trim(), 
                    phone: phone ? String(phone).trim() : '', 
                    password: hashedPassword 
                });
                
                await user.save();

                // Send email but don't fail if it doesn't work
                try {
                    await sendEmail(email, 'Your Account Credentials', `Email: ${email}\nPassword: ${password}`);
                } catch (emailError) {
                    console.warn(`Warning: Failed to send email to ${email}:`, emailError.message);
                    // Continue even if email fails
                }

                usersData.push({ Email: email, Name: name || 'User', Phone: phone || 'N/A', Password: password });
            } catch (rowError) {
                errors.push(`Row ${i + 1}: ${rowError.message}`);
                console.error(`Error processing row ${i + 1}:`, rowError);
            }
        }

        // Prepare response
        const response = {
            message: `Successfully created ${usersData.length} user(s)`,
            usersCreated: usersData.length,
            totalRows: data.length,
            credentials: usersData
        };

        if (errors.length > 0) {
            response.warnings = errors;
            response.errorCount = errors.length;
        }
        
        console.log('Final response:', response);
        res.json(response);
    } catch (error) {
        console.error('Error in generateCredentials:', error);
        res.status(500).json({ 
            error: error.message || 'Internal Server Error',
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};
