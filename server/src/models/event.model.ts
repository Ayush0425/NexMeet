import mongoose, {
  Schema,
  InferSchemaType,
  HydratedDocument,
} from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Tech",
        "Workshop",
        "Hackathon",
        "Seminar",
        "Cultural",
        "Music",
        "Sports",
        "Business",
      ],
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    startDateTime: {
      type: Date,
      required: true,
    },

    banner: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },

    availableSeats: {
      type: Number,
      required: true,
      min: 0,
    },

    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

export type Event = InferSchemaType<typeof eventSchema>;
export type EventDocument = HydratedDocument<Event>;

const EventModel = mongoose.model("Event", eventSchema);

export default EventModel;