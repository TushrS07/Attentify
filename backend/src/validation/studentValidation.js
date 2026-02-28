import { z } from "zod";

// Regex: Minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const studentSchema = z.object({
  name: z.string()
    .min(3, "Name must be at least 3 characters long")
    .regex(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces")
    .optional(),

  phone: z.string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .optional(),

  email: z.string()
    .email("Invalid email format")
    .optional(),

  password: z.string()
    .regex(
      passwordRegex,
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    )
    .optional(),

  confirmPassword: z.string()
    .regex(
      passwordRegex,
      "Confirm password must meet the same complexity as password"
    )
    .optional(),

  rollNumber: z.string()
    .regex(/^\d{10}$/, "Roll number must be exactly 10 digits")
    .optional(),

  groupNumber: z.string()
    .regex(/^\d{2}$/, "Group number must be exactly 2 digits")
    .optional(),

  dob: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "DOB must be in YYYY-MM-DD format")
    .optional(),

  guardianName: z.string()
    .min(3, "Guardian name must be at least 3 characters")
    .regex(/^[A-Za-z\s]+$/, "Guardian name must contain only letters and spaces")
    .optional(),

  guardianPhoneNo: z.string()
    .regex(/^\d{10}$/, "Guardian phone must be exactly 10 digits")
    .optional(),

  capturedImageUrl: z.string().url("Invalid image URL").optional(),
  uploadedImageUrl: z.string().url("Invalid image URL").optional(),
});

// Optional: Add password match validation
export const validateStudent = (data) => {
  const result = studentSchema.safeParse(data);
  if (!result.success) {
    return result.error.errors.map(err => err.message);
  }

  if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
    return ["Password and confirm password do not match"];
  }

  return null;
};

export default studentSchema;
