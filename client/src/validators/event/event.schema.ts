import { z } from "zod";

export const createEventSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters"),

  category: z.enum([
    "Tech",
    "Workshop",
    "Hackathon",
    "Seminar",
    "Cultural",
    "Music",
    "Sports",
    "Business",
  ]),

  location: z
    .string()
    .min(3, "Location is required"),

  startDateTime: z
    .string()
    .min(1, "Date & Time is required"),

  price: z.coerce
    .number()
    .min(0, "Price cannot be negative"),

  totalSeats: z.coerce
    .number()
    .min(1, "At least 1 seat is required"),

  banner: z
    .any()
    .optional(),
});

export type CreateEventFormData = z.infer<
  typeof createEventSchema
>;