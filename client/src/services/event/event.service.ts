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

// ======================
// Create Event
// ======================
export const createEvent = async (
  formData: FormData
) => {
  const response = await api.post(
    "/events",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ======================
// Get My Events
// ======================
export const getMyEvents = async () => {
  const response = await api.get(
    "/events/my-events"
  );

  return response.data;
};

// ======================
// Update Event
// ======================
export const updateEvent = async (
  id: string,
  formData: FormData
) => {
  const response = await api.put(
    `/events/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
// ======================
// Delete Event
// ======================
export const deleteEvent = async (
  id: string
) => {
  const response = await api.delete(
    `/events/${id}`
  );

  return response.data;
};