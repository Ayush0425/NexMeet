import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { generateResetToken } from "../utils/resetToken";

import {
  RegisterUserInput,
  LoginUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "../validators/auth.validator";

import {
  createUser,
  findUserByEmail,
  findUserByEmailWithPassword,
  findUserByUsername,
  saveResetPasswordToken,
  findUserByResetToken,
  updateUserPassword,
} from "../repositories/user.repository";

// ==========================
// Register User
// ==========================
export const registerUserService = async (
  userData: RegisterUserInput
) => {
  const {
    fullName,
    username,
    email,
    password,
    phone,
    bio,
    avatar,
  } = userData;

  // Check Email
  const existingEmail = await findUserByEmail(email);

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  // Check Username
  const existingUsername = await findUserByUsername(username);

  if (existingUsername) {
    throw new Error("Username already exists");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    fullName,
    username,
    email,
    password: hashedPassword,
    phone,
    bio,
    avatar,
  });

  return {
    id: user._id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio,
    phone: user.phone,
    role: user.role,
    provider: user.provider,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

// ==========================
// Login User
// ==========================
export const loginUserService = async (
  userData: LoginUserInput
) => {
  const { email, password } = userData;

  const user = await findUserByEmailWithPassword(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id.toString());

  return {
    id: user._id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio,
    phone: user.phone,
    role: user.role,
    provider: user.provider,
    isVerified: user.isVerified,
    token,
  };
};

// ==========================
// Forgot Password
// ==========================
export const forgotPasswordService = async (
  data: ForgotPasswordInput
) => {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = generateResetToken();

  const expire = new Date(
    Date.now() + 15 * 60 * 1000
  );

  await saveResetPasswordToken(
    data.email,
    resetToken,
    expire
  );

  return {
    success: true,
    message: "Reset link generated successfully",
    resetLink: `http://localhost:5173/reset-password/${resetToken}`,
  };
};

// ==========================
// Reset Password
// ==========================
export const resetPasswordService = async (
  data: ResetPasswordInput
) => {
  const user = await findUserByResetToken(
    data.token
  );

  if (!user) {
    throw new Error(
      "Invalid or expired reset token"
    );
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );

  await updateUserPassword(
    user._id.toString(),
    hashedPassword
  );

  return {
    success: true,
    message: "Password reset successful",
  };
};