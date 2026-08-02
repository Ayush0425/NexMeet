import api from "../../lib/axios";

export const registerUser = async (data: unknown) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

export const loginUser = async (data: unknown) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};