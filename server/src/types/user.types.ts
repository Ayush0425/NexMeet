import { Document } from "mongoose";

export type UserRole = "user" | "organizer" | "admin";

export type AuthProvider = "local" | "google";

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  password: string;

  avatar?: string;
  bio?: string;
  phone?: string;

  role: UserRole;

  provider: AuthProvider;

  isVerified: boolean;

  refreshToken?: string;

  createdAt: Date;
  updatedAt: Date;
}