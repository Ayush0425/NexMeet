import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    bookingStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "cancelled",
      ],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// ==========================
// Indexes
// ==========================

// Faster queries for My Bookings
bookingSchema.index({
  user: 1,
  createdAt: -1,
});

// Faster queries for Event Bookings
bookingSchema.index({
  event: 1,
});

// Prevent multiple active bookings
// for the same user and event.
//
// Cancelled bookings are excluded,
// so a user can book again after cancellation.
bookingSchema.index(
  {
    user: 1,
    event: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      bookingStatus: {
        $in: [
          "pending",
          "confirmed",
        ],
      },
    },
  }
);

export default mongoose.model(
  "Booking",
  bookingSchema
);