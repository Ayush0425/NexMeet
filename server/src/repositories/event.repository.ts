import EventModel from "../models/event.model";
import { CreateEventInput } from "../validators/event.validator";
export const createEvent = async (
  eventData: CreateEventInput & {
    organizer: string;
    availableSeats: number;
  }
) => {
  return await EventModel.create(eventData);
};
export const getAllEvents = async () => {
  return await EventModel.find()
    .populate("organizer", "fullName email")
    .sort({ startDateTime: 1 });
};