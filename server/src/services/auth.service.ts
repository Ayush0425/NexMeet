import bcrypt from "bcryptjs";

import {
  createUser,
  findUserByEmail,
  findUserByUsername,
} from "../repositories/user.repository";

export const registerUserService = async (userData: any) => {
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