import { CreateEventInput } from "../validators/event.validator";
import { AppError } from "../utils/AppError";

import {
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../repositories/event.repository";

// ==========================
// Create Event
// ==========================
export const createEventService = async (
  eventData: CreateEventInput,
  organizerId: string,
  banner?: string
) => {
  const newEvent = await createEvent({
    ...eventData,
    banner,
    organizer: organizerId,
    availableSeats: eventData.totalSeats,
  });

  return newEvent;
};

// ==========================
// Get Event By ID
// ==========================
export const getEventByIdService = async (
  eventId: string
) => {
  const event = await getEventById(eventId);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  return event;
};

// ==========================
// Update Event
// ==========================
export const updateEventService = async (
  eventId: string,
  organizerId: string,
  updateData: Partial<CreateEventInput>
) => {
  // Check if event exists
  const event = await getEventById(eventId);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  // Check ownership
  const eventOrganizerId =
    (event.organizer as any)._id?.toString() ??
    event.organizer.toString();

  if (eventOrganizerId !== organizerId) {
    throw new AppError(
      "You are not authorized to update this event",
      403
    );
  }

  // Update event
  const updatedEvent = await updateEvent(
    eventId,
    updateData
  );

  return updatedEvent;
};

// ==========================
// Delete Event
// ==========================
export const deleteEventService = async (
  eventId: string,
  organizerId: string
) => {
  // Check if event exists
  const event = await getEventById(eventId);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  // Check ownership
  const eventOrganizerId =
    (event.organizer as any)._id?.toString() ??
    event.organizer.toString();

  if (eventOrganizerId !== organizerId) {
    throw new AppError(
      "You are not authorized to delete this event",
      403
    );
  }

  // Delete event
  await deleteEvent(eventId);
};