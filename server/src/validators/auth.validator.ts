import { z } from "zod";

// ==========================
// Register
// ==========================
export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(
      3,
      "Full name must be at least 3 characters"
    )
    .max(
      100,
      "Full name cannot exceed 100 characters"
    ),

  username: z
    .string()
    .trim()
    .min(
      3,
      "Username must be at least 3 characters"
    )
    .max(
      20,
      "Username cannot exceed 20 characters"
    )
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscores"
    ),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(
      254,
      "Email address is too long"
    ),

  password: z
    .string()
    .min(
      8,
      "Password must be at least 8 characters"
    )
    .max(
      128,
      "Password cannot exceed 128 characters"
    ),

  phone: z
    .string()
    .trim()
    .max(
      20,
      "Phone number is too long"
    )
    .optional(),

  bio: z
    .string()
    .trim()
    .max(
      500,
      "Bio cannot exceed 500 characters"
    )
    .optional(),

  avatar: z
    .string()
    .url("Invalid avatar URL")
    .optional(),
});

export type RegisterUserInput =
  z.infer<typeof registerSchema>;

// ==========================
// Login
// ==========================
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email")
    .max(
      254,
      "Email address is too long"
    ),

  password: z
    .string()
    .min(
      8,
      "Password must be at least 8 characters"
    )
    .max(
      128,
      "Password cannot exceed 128 characters"
    ),
});

export type LoginUserInput =
  z.infer<typeof loginSchema>;

// ==========================
// Forgot Password
// ==========================
export const forgotPasswordSchema =
  z.object({
    email: z
      .string()
      .trim()
      .email("Invalid email address")
      .max(
        254,
        "Email address is too long"
      ),
  });

export type ForgotPasswordInput =
  z.infer<typeof forgotPasswordSchema>;

// ==========================
// Reset Password
// ==========================
export const resetPasswordSchema =
  z.object({
    token: z
      .string()
      .min(
        1,
        "Reset token is required"
      ),

    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters"
      )
      .max(
        128,
        "Password cannot exceed 128 characters"
      ),
  });

export type ResetPasswordInput =
  z.infer<typeof resetPasswordSchema>;