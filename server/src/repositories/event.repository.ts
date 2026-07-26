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
export const getEventById = async (eventId: string) => {
  return await EventModel.findById(eventId).populate(
    "organizer",
    "fullName email"
  );
};
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
export const deleteEvent = async (eventId: string) => {
  return await EventModel.findByIdAndDelete(eventId);
};