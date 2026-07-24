import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  fullName: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  role: "user" | "organizer" | "admin";
  provider: "local" | "google";
  isVerified: boolean;
}