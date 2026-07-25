import { z } from "zod";

export const createEventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description cannot exceed 1000 characters"),

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
    .trim()
    .min(3, "Location is required"),

  startDateTime: z.coerce.date(),

  banner: z.string().url().optional().or(z.literal("")),

  price: z
    .number()
    .min(0, "Price cannot be negative")
    .default(0),

  totalSeats: z
    .number()
    .int()
    .positive("Total seats must be greater than 0"),
});

export type CreateEventInput =
  z.infer<typeof createEventSchema>;