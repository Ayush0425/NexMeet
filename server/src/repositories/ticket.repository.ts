import TicketModel from "../models/ticket.model";

// ==========================
// Create Ticket
// ==========================
export const createTicket = async (
  ticketData: {
    booking: string;
    user: string;
    event: string;
    ticketCode: string;
    qrCode: string;
  }
) => {
  return await TicketModel.create(
    ticketData
  );
};

// ==========================
// Get Tickets By Booking
// ==========================
export const getTicketsByBooking = async (
  bookingId: string
) => {
  return await TicketModel.find({
    booking: bookingId,
  }).sort({
    createdAt: 1,
  });
};

// ==========================
// Get Tickets By User
// ==========================
export const getTicketsByUser = async (
  userId: string
) => {
  return await TicketModel.find({
    user: userId,
  })
    .populate(
      "event",
      "title location startDateTime banner"
    )
    .sort({
      createdAt: -1,
    });
};

// ==========================
// Get Ticket By Code
// ==========================
export const getTicketByCode = async (
  ticketCode: string
) => {
  return await TicketModel.findOne({
    ticketCode,
  });
};

// ==========================
// Update Ticket Status
// ==========================
export const updateTicketStatus = async (
  ticketId: string,
  status:
    | "active"
    | "used"
    | "cancelled"
) => {
  return await TicketModel.findByIdAndUpdate(
    ticketId,
    {
      status,
      ...(status === "used"
        ? { checkedInAt: new Date() }
        : {}),
    },
    {
      new: true,
      runValidators: true,
    }
  );
};