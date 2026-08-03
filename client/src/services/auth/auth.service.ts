import api from "../../lib/axios";

export const registerUser = async (data: unknown) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: unknown) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

// ==========================
// Forgot Password
// ==========================
export const forgotPassword = async (
  data: { email: string }
) => {
  const response = await api.post(
    "/auth/forgot-password",
    data
  );

  return response.data;
};

// ==========================
// Reset Password
// ==========================
export const resetPassword = async (
  token: string,
  data: { password: string }
) => {
  const response = await api.post(
    `/auth/reset-password/${token}`,
    data
  );

  return response.data;
};