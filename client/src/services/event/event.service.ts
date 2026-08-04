import api from "../../lib/axios";

// ======================
// Get All Events
// ======================
export const getAllEvents = async () => {
  const response = await api.get("/events");

  return response.data;
};

// ======================
// Get Event By ID
// ======================
export const getEventById = async (
  id: string
) => {
  const response = await api.get(
    `/events/${id}`
  );

  return response.data;
};