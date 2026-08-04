import { z } from "zod";

// ======================
// Booking Schema
// ======================
export const bookingSchema = z.object({
  eventId: z
    .string()
    .min(1, "Event ID is required"),

  quantity: z
    .number({
      error: "Quantity is required",
    })
    .int("Quantity must be a whole number")
    .min(1, "Minimum 1 ticket")
    .max(10, "Maximum 10 tickets"),
});

export type BookingFormData = z.infer<
  typeof bookingSchema
>;