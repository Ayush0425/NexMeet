import api from "../../lib/axios";

// ==========================
// Get My Tickets
// ==========================
export const getMyTickets = async () => {
  const response = await api.get(
    "/tickets/my"
  );

  return response.data;
};