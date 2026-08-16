import {
  useState,
  type ChangeEvent,
} from "react";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import {
  createEvent,
  updateEvent,
} from "../../../services/event/event.service";

import {
  createEventSchema,
  type CreateEventFormData,
} from "../../../validators/event/event.schema";

type EventFormProps = {
  mode?: "create" | "edit";
  event?: any;
};

function EventForm({
  mode = "create",
  event,
}: EventFormProps) {
  const navigate = useNavigate();

  const [banner, setBanner] =
    useState<File | null>(null);

  const [bannerError, setBannerError] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(
      createEventSchema
    ),
    defaultValues: event
      ? {
          title: event.title,
          description: event.description,
          category: event.category,
          location: event.location,
          startDateTime:
            event.startDateTime?.slice(
              0,
              16
            ),
          price: event.price,
          totalSeats: event.totalSeats,
        }
      : undefined,
  });

  // ==========================
  // Banner Validation
  // ==========================
  const handleBannerChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    // Clear previous error
    setBannerError("");

    // No file selected
    if (!file) {
      setBanner(null);
      return;
    }

    // Allowed image types
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    // Maximum file size: 5 MB
    const maxSize = 5 * 1024 * 1024;

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setBanner(null);

      setBannerError(
        "Please select a JPG, PNG, or WEBP image."
      );

      // Reset file input
      e.target.value = "";

      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setBanner(null);

      setBannerError(
        "Image size must be less than 5 MB."
      );

      // Reset file input
      e.target.value = "";

      return;
    }

    // Valid image
    setBanner(file);
  };

  // ==========================
  // Submit
  // ==========================
  const onSubmit = async (
    data: CreateEventFormData
  ) => {
    // Extra safety check
    if (bannerError) {
      return;
    }

    try {
      const formData = new FormData();

      formData.append(
        "title",
        data.title
      );

      formData.append(
        "description",
        data.description
      );

      formData.append(
        "category",
        data.category
      );

      formData.append(
        "location",
        data.location
      );

      formData.append(
        "startDateTime",
        data.startDateTime
      );

      formData.append(
        "price",
        String(data.price)
      );

      formData.append(
        "totalSeats",
        String(data.totalSeats)
      );

      // Add banner only if a valid
      // new image was selected
      if (banner) {
        formData.append(
          "banner",
          banner
        );
      }

      // ==========================
      // Create / Update
      // ==========================
      if (mode === "create") {
        await createEvent(formData);

        toast.success(
          "Event created successfully!"
        );
      } else {
        await updateEvent(
          event._id,
          formData
        );

        toast.success(
          "Event updated successfully!"
        );
      }

      navigate(
        "/dashboard/my-events"
      );
    } catch {
      toast.error(
        mode === "create"
          ? "Failed to create event"
          : "Failed to update event"
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-800 bg-[#162032] p-5 shadow-xl sm:p-8">
      {/* ==========================
          Header
      ========================== */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          {mode === "create"
            ? "Create New Event"
            : "Edit Event"}
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
          {mode === "create"
            ? "Fill in the details below to publish your event."
            : "Update your event information."}
        </p>
      </div>

      {/* ==========================
          Form
      ========================== */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* ==========================
            Title
        ========================== */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Event Title
          </label>

          <input
            {...register("title")}
            type="text"
            placeholder="Enter event title"
            className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500 sm:text-base"
          />

          {errors.title && (
            <p className="mt-2 text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* ==========================
            Description
        ========================== */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Description
          </label>

          <textarea
            {...register(
              "description"
            )}
            rows={5}
            placeholder="Describe your event..."
            className="w-full resize-y rounded-xl border border-slate-700 bg-[#0B1120] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500 sm:text-base"
          />

          {errors.description && (
            <p className="mt-2 text-sm text-red-500">
              {
                errors.description
                  .message
              }
            </p>
          )}
        </div>

        {/* ==========================
            Category
        ========================== */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Category
          </label>

          <select
            {...register("category")}
            className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500 sm:text-base"
          >
            <option value="Tech">
              Tech
            </option>

            <option value="Workshop">
              Workshop
            </option>

            <option value="Hackathon">
              Hackathon
            </option>

            <option value="Seminar">
              Seminar
            </option>

            <option value="Cultural">
              Cultural
            </option>

            <option value="Music">
              Music
            </option>

            <option value="Sports">
              Sports
            </option>

            <option value="Business">
              Business
            </option>
          </select>

          {errors.category && (
            <p className="mt-2 text-sm text-red-500">
              {
                errors.category
                  .message
              }
            </p>
          )}
        </div>

        {/* ==========================
            Location
        ========================== */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Location
          </label>

          <input
            {...register("location")}
            type="text"
            placeholder="Enter venue/location"
            className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500 sm:text-base"
          />

          {errors.location && (
            <p className="mt-2 text-sm text-red-500">
              {
                errors.location
                  .message
              }
            </p>
          )}
        </div>

        {/* ==========================
            Date & Time
        ========================== */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Start Date & Time
          </label>

          <input
            {...register(
              "startDateTime"
            )}
            type="datetime-local"
            className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500 sm:text-base"
          />

          {errors.startDateTime && (
            <p className="mt-2 text-sm text-red-500">
              {
                errors.startDateTime
                  .message
              }
            </p>
          )}
        </div>

        {/* ==========================
            Price + Seats
        ========================== */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Price */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Ticket Price (₹)
            </label>

            <input
              {...register("price")}
              type="number"
              min="0"
              placeholder="499"
              className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500 sm:text-base"
            />

            {errors.price && (
              <p className="mt-2 text-sm text-red-500">
                {
                  errors.price
                    .message
                }
              </p>
            )}
          </div>

          {/* Seats */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Total Seats
            </label>

            <input
              {...register(
                "totalSeats"
              )}
              type="number"
              min="1"
              placeholder="100"
              className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500 sm:text-base"
            />

            {errors.totalSeats && (
              <p className="mt-2 text-sm text-red-500">
                {
                  errors.totalSeats
                    .message
                }
              </p>
            )}
          </div>
        </div>

        {/* ==========================
            Banner
        ========================== */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Event Banner
          </label>

          <div
            className={`rounded-xl border border-dashed bg-[#0B1120] p-4 ${
              bannerError
                ? "border-red-500/60"
                : "border-slate-700"
            }`}
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={
                handleBannerChange
              }
              className="block w-full cursor-pointer text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-emerald-700"
            />

            {/* Validation Error */}
            {bannerError && (
              <p className="mt-3 text-sm text-red-400">
                {bannerError}
              </p>
            )}

            {/* Selected Image */}
            {banner && !bannerError && (
              <p className="mt-3 break-all text-sm text-emerald-400">
                Selected:{" "}
                {banner.name}
              </p>
            )}

            {/* Existing Banner */}
            {mode === "edit" &&
              event?.banner &&
              !banner && (
                <p className="mt-3 text-sm text-slate-400">
                  Current banner will be
                  kept unless you select a
                  new image.
                </p>
              )}

            {/* Upload Requirements */}
            <p className="mt-3 text-xs text-slate-500">
              Accepted formats: JPG, PNG,
              WEBP · Maximum size: 5 MB
            </p>
          </div>
        </div>

        {/* ==========================
            Submit
        ========================== */}
        <button
          type="submit"
          disabled={
            isSubmitting ||
            !!bannerError
          }
          className="w-full rounded-xl bg-emerald-500 py-3.5 text-base font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
        >
          {isSubmitting
            ? mode === "create"
              ? "Publishing..."
              : "Updating..."
            : mode === "create"
            ? "Publish Event"
            : "Update Event"}
        </button>
      </form>
    </div>
  );
}

export default EventForm;