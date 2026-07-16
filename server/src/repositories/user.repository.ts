import User from "../models/user.model";

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const findUserByUsername = async (username: string) => {
  return await User.findOne({ username });
};

export const createUser = async (userData: object) => {
  return await User.create(userData);
};