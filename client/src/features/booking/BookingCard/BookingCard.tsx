import { useState } from "react";
import { createBooking } from "../../../services/booking/booking.service";

type Props = {
  eventId: string;
  price: number;
};

function BookingCard({
  eventId,
  price,
}: Props) {
  const [quantity, setQuantity] =
    useState(1);

  const total = quantity * price;

  const handleBooking = async () => {
    try {
      await createBooking({
        eventId,
        quantity,
      });

      alert("Booking Successful!");
    } catch (error: any) {
      alert(
        error.response?.data?.message ??
          "Booking Failed"
      );
    }
  };

  return (
    <>
      <div className="mt-6">
        <label className="mb-2 block text-slate-300">
          Quantity
        </label>

        <input
          type="number"
          min={1}
          max={10}
          value={quantity}
          onChange={(e) =>
            setQuantity(Number(e.target.value))
          }
          className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-4 py-3 text-white"
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-slate-400">
          Total
        </span>

        <span className="text-2xl font-bold text-emerald-400">
          ₹{total}
        </span>
      </div>

      <button
        onClick={handleBooking}
        className="mt-8 w-full rounded-xl bg-emerald-500 py-4 text-lg font-semibold text-white hover:bg-emerald-600"
      >
        Book Ticket
      </button>
    </>
  );
}

export default BookingCard;