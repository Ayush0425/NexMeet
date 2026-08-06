import {
  useState,
  type ChangeEvent,
} from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createEvent } from "../../../services/event/event.service";

import {
  createEventSchema,
  type CreateEventFormData,
} from "../../../validators/event/event.schema";

function CreateEvent() {
  const navigate = useNavigate();

  const [banner, setBanner] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createEventSchema),
  });

 const handleBannerChange = (
  e: ChangeEvent<HTMLInputElement>
) => {
  if (e.target.files?.length) {
    setBanner(e.target.files[0]);
  }
};

  const onSubmit = async (
    data: CreateEventFormData
  ) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
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

      if (banner) {
        formData.append("banner", banner);
      }

      await createEvent(formData);

      alert("Event created successfully!");

      navigate("/dashboard/my-events");
    } catch (error) {
      console.error(error);
      alert("Failed to create event");
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-3xl bg-[#162032] p-8 shadow-xl">
      <h1 className="mb-2 text-3xl font-bold text-white">
        Create New Event
      </h1>

      <p className="mb-8 text-slate-400">
        Fill in the details below to publish your event.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Event Title
          </label>

          <input
            {...register("title")}
            type="text"
            placeholder="Enter event title"
            className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-4 py-3 text-white outline-none focus:border-emerald-500"
          />

          {errors.title && (
            <p className="mt-2 text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Description
          </label>

          <textarea
            {...register("description")}
            rows={5}
            placeholder="Describe your event..."
            className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-4 py-3 text-white outline-none focus:border-emerald-500"
          />

          {errors.description && (
            <p className="mt-2 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Category
          </label>

          <select
            {...register("category")}
            className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-4 py-3 text-white outline-none focus:border-emerald-500"
          >
            <option value="Tech">Tech</option>
            <option value="Workshop">Workshop</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Seminar">Seminar</option>
            <option value="Cultural">Cultural</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
          </select>

          {errors.category && (
            <p className="mt-2 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Location
          </label>

          <input
            {...register("location")}
            type="text"
            placeholder="Enter venue/location"
            className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-4 py-3 text-white outline-none focus:border-emerald-500"
          />

          {errors.location && (
            <p className="mt-2 text-sm text-red-500">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Start Date & Time
          </label>

          <input
            {...register("startDateTime")}
            type="datetime-local"
            className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-4 py-3 text-white outline-none focus:border-emerald-500"
          />

          {errors.startDateTime && (
            <p className="mt-2 text-sm text-red-500">
              {errors.startDateTime.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Ticket Price (₹)
          </label>

          <input
            {...register("price")}
            type="number"
            placeholder="499"
            className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-4 py-3 text-white outline-none focus:border-emerald-500"
          />

          {errors.price && (
            <p className="mt-2 text-sm text-red-500">
              {errors.price.message}
            </p>
          )}
        </div>

        {/* Seats */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Total Seats
          </label>

          <input
            {...register("totalSeats")}
            type="number"
            placeholder="100"
            className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-4 py-3 text-white outline-none focus:border-emerald-500"
          />

          {errors.totalSeats && (
            <p className="mt-2 text-sm text-red-500">
              {errors.totalSeats.message}
            </p>
          )}
        </div>

     {/* Banner */}
<div>
  <label className="mb-2 block text-sm font-medium text-slate-300">
    Event Banner
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleBannerChange}
    className="block w-full text-slate-300"
  />

  {banner && (
    <p className="mt-2 text-sm text-emerald-400">
      Selected: {banner.name}
    </p>
  )}
</div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-emerald-500 py-3 text-lg font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Publishing..."
            : "Publish Event"}
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;