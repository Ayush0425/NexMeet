import { z } from "zod";

// Register
export const registerSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
});

export type RegisterUserInput = z.infer<typeof registerSchema>;

// Login
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginUserInput = z.infer<typeof loginSchema>;