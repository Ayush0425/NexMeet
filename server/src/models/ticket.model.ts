import mongoose, {
  Schema,
  InferSchemaType,
  HydratedDocument,
} from "mongoose";

const ticketSchema = new Schema(
  {
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

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

    ticketCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    qrCode: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "active",
        "used",
        "cancelled",
      ],
      default: "active",
    },

    checkedInAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Faster queries
ticketSchema.index({
  booking: 1,
});

ticketSchema.index({
  user: 1,
  createdAt: -1,
});

ticketSchema.index({
  event: 1,
});

export type Ticket =
  InferSchemaType<typeof ticketSchema>;

export type TicketDocument =
  HydratedDocument<Ticket>;

const TicketModel = mongoose.model(
  "Ticket",
  ticketSchema
);

export default TicketModel;