import { CreateEventInput } from "../validators/event.validator";
import { createEvent } from "../repositories/event.repository";
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
