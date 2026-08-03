import User from "../models/user.model";

// ==========================
// Find User
// ==========================
export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

// Used only during Login
export const findUserByEmailWithPassword = async (
  email: string
) => {
  return await User.findOne({ email }).select("+password");
};

export const findUserByUsername = async (
  username: string
) => {
  return await User.findOne({ username });
};

export const findUserById = async (id: string) => {
  return await User.findById(id).select(
    "-password -refreshToken -__v"
  );
};

// ==========================
// Create User
// ==========================
export const createUser = async (
  userData: object
) => {
  return await User.create(userData);
};

// ==========================
// Forgot Password
// ==========================
export const saveResetPasswordToken = async (
  email: string,
  token: string,
  expire: Date
) => {
  return await User.findOneAndUpdate(
    { email },
    {
      resetPasswordToken: token,
      resetPasswordExpire: expire,
    },
    { new: true }
  );
};

export const findUserByResetToken = async (
  token: string
) => {
  return await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: new Date() },
  }).select("+password");
};

export const updateUserPassword = async (
  userId: string,
  password: string
) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      password,
      resetPasswordToken: "",
      resetPasswordExpire: null,
    },
    { new: true }
  );
};