import EventModel from "../models/event.model";
import { CreateEventInput } from "../validators/event.validator";

// ==========================
// Create Event
// ==========================
export const createEvent = async (
  eventData: CreateEventInput & {
    organizer: string;
    availableSeats: number;
  }
  
) => {
  return await EventModel.create(eventData);
};

// ==========================
// Get All Events
// ==========================
export const getAllEvents = async (
  search?: string,
  category?: string,
  page: number = 1,
  limit: number = 10,
  sort?: string
) => {
  const query: Record<string, any> = {};

  if (search) {
    query.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
      {
        location: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (category) {
    query.category = category;
  }

  // Pagination
  const skip = (page - 1) * limit;
  let sortQuery: any = { startDateTime: 1 };

switch (sort) {
  case "newest":
    sortQuery = { createdAt: -1 };
    break;

  case "oldest":
    sortQuery = { createdAt: 1 };
    break;

  case "priceAsc":
    sortQuery = { price: 1 };
    break;

  case "priceDesc":
    sortQuery = { price: -1 };
    break;

  default:
    sortQuery = { startDateTime: 1 };
}

  const events = await EventModel.find(query)
    .populate("organizer", "fullName email")
    .sort({ startDateTime: 1 })
    .skip(skip)
    .limit(limit);

  const totalEvents = await EventModel.countDocuments(query);

  return {
    events,
    totalEvents,
  };
};

// ==========================
// Get Event By ID
// ==========================
export const getEventById = async (eventId: string) => {
  return await EventModel.findById(eventId).populate(
    "organizer",
    "fullName email"
  );
};

// ==========================
// Update Event
// ==========================
export const updateEvent = async (
  eventId: string,
  updateData: Partial<CreateEventInput>
) => {
  return await EventModel.findByIdAndUpdate(
    eventId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  ).populate("organizer", "fullName email");
};

// ==========================
// Delete Event
// ==========================
export const deleteEvent = async (eventId: string) => {
  return await EventModel.findByIdAndDelete(eventId);
};

export const updateAvailableSeats = async (
  eventId: string,
  availableSeats: number
) => {
  return await EventModel.findByIdAndUpdate(
    eventId,
    { availableSeats },
    { new: true }
  );
};
// ==========================
// Increase Available Seats
// ==========================
export const increaseAvailableSeats = async (
  eventId: string,
  seats: number
) => {
  return await EventModel.findByIdAndUpdate(
    eventId,
    {
      $inc: {
        availableSeats: seats,
      },
    },
    {
      new: true,
    }
  );
};