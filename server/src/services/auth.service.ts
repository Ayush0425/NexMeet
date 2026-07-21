import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

import {
  RegisterUserInput,
  LoginUserInput,
} from "../validators/auth.validator";

import {
  createUser,
  findUserByEmail,
  findUserByEmailWithPassword,
  findUserByUsername,
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

  // Find user
  const user = await findUserByEmailWithPassword(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare password
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
    token: token,
  };
};