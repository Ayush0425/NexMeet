import { CreateEventInput } from "../validators/event.validator";
import {
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../repositories/event.repository";

export const createEventService = async (
  eventData: CreateEventInput,
  organizerId: string
) => {
  const newEvent = await createEvent({
    ...eventData,
    organizer: organizerId,
    availableSeats: eventData.totalSeats,
  });

  return newEvent;
};

export const getEventByIdService = async (
  eventId: string
) => {
  const event = await getEventById(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  return event;
};
export const updateEventService = async (
  eventId: string,
  organizerId: string,
  updateData: Partial<CreateEventInput>
) => {
  // Check if event exists
  const event = await getEventById(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  // Check ownership
 // Check ownership
const eventOrganizerId =
  (event.organizer as any)._id?.toString() ??
  event.organizer.toString();

if (eventOrganizerId !== organizerId) {
  throw new Error("You are not authorized to update this event");
}

  // Update event
  const updatedEvent = await updateEvent(eventId, updateData);

  return updatedEvent;
};
export const deleteEventService = async (
  eventId: string,
  organizerId: string
) => {
  // Check if event exists
  const event = await getEventById(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  // Check ownership
  const eventOrganizerId =
    (event.organizer as any)._id?.toString() ??
    event.organizer.toString();

  if (eventOrganizerId !== organizerId) {
    throw new Error("You are not authorized to delete this event");
  }

  // Delete event
  await deleteEvent(eventId);

  return;
};
