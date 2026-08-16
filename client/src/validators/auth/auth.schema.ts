import { z } from "zod";

// ======================
// Login Schema
// ======================
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
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
});

export type LoginFormData =
  z.infer<typeof loginSchema>;

// ======================
// Register Schema
// ======================
export const registerSchema = z
  .object({
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
      .min(1, "Email is required")
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

    confirmPassword: z
      .string()
      .min(
        8,
        "Confirm your password"
      )
      .max(
        128,
        "Password cannot exceed 128 characters"
      ),
  })
  .refine(
    (data) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type RegisterFormData =
  z.infer<typeof registerSchema>;

// ======================
// Forgot Password Schema
// ======================
export const forgotPasswordSchema =
  z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email address")
      .max(
        254,
        "Email address is too long"
      ),
  });

export type ForgotPasswordFormData =
  z.infer<typeof forgotPasswordSchema>;

// ======================
// Reset Password Schema
// ======================
export const resetPasswordSchema = z
  .object({
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

    confirmPassword: z
      .string()
      .min(
        8,
        "Confirm your password"
      )
      .max(
        128,
        "Password cannot exceed 128 characters"
      ),
  })
  .refine(
    (data) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type ResetPasswordFormData =
  z.infer<typeof resetPasswordSchema>;