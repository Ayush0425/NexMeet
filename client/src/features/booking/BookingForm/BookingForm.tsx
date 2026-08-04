import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  bookingSchema,
  type BookingFormData,
} from "../../../validators/booking/booking.schema";

import { createBooking } from "../../../services/booking/booking.service";

type BookingFormProps = {
  eventId: string;
};

function BookingForm({
  eventId,
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),

    defaultValues: {
      eventId,
      quantity: 1,
    },
  });

  const onSubmit = async (
    data: BookingFormData
  ) => {
    try {
      const response =
        await createBooking(data);

      console.log(response);

      alert("Booking Successful!");
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Booking Failed"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-slate-300">
          Tickets
        </label>

        <input
          type="number"
          min={1}
          max={10}
          {...register("quantity", {
            valueAsNumber: true,
          })}
          className="w-full rounded-xl border border-slate-700 bg-[#162032] px-4 py-3 text-white outline-none focus:border-emerald-500"
        />

        {errors.quantity && (
          <p className="mt-1 text-sm text-red-500">
            {errors.quantity.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white hover:bg-emerald-600 disabled:opacity-50"
      >
        {isSubmitting
          ? "Booking..."
          : "Book Now"}
      </button>
    </form>
  );
}

export default BookingForm;