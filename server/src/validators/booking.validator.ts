import { z } from "zod";

export const createBookingSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),

  quantity: z
    .number()
    .int("Quantity must be an integer")
    .min(1, "At least one ticket is required"),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;