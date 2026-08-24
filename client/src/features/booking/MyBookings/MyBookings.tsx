import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  cancelBooking,
  getMyBookings,
} from "../../../services/booking/booking.service";

import {
  createPaymentOrder,
  verifyPayment,
} from "../../../services/payment/payment.service";

// ==========================
// Razorpay Type Definitions
// ==========================
declare global {
  interface Window {
    Razorpay: new (
      options: RazorpayOptions
    ) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;

  handler: (response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => void;

  prefill?: {
    name?: string;
    email?: string;
  };

  theme?: {
    color?: string;
  };
}

interface RazorpayInstance {
  open: () => void;
}

function MyBookings() {
  const queryClient = useQueryClient();

  // ==========================
  // Get My Bookings
  // ==========================
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: getMyBookings,
  });

  // ==========================
  // Cancel Booking
  // ==========================
  const cancelMutation = useMutation({
    mutationFn: cancelBooking,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-bookings"],
      });

      toast.success(
        "Booking cancelled successfully!"
      );
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to cancel booking"
      );
    },
  });

  // ==========================
  // Cancel Booking Handler
  // ==========================
  const handleCancelBooking = (
    bookingId: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

    cancelMutation.mutate(bookingId);
  };

  // ==========================
  // Payment Mutation
  // ==========================
  const paymentMutation = useMutation({
    mutationFn: createPaymentOrder,

   onSuccess: (response) => {
      const order = response?.data?.order;
      const key = response?.key;

      if (!order || !key) {
        toast.error(
          "Unable to create payment order."
        );

        return;
      }

      // ==========================
      // Open Razorpay Checkout
      // ==========================
      const razorpay =
        new window.Razorpay({
          key,

          amount: order.amount,

          currency: order.currency,

          name: "NexMeet",

          description:
            "Event Booking Payment",

          order_id: order.id,

          handler: async (
            paymentResponse
          ) => {
            try {
              // ==========================
              // Verify Payment On Backend
              // ==========================
              await verifyPayment({
                razorpay_order_id:
                  paymentResponse.razorpay_order_id,

                razorpay_payment_id:
                  paymentResponse.razorpay_payment_id,

                razorpay_signature:
                  paymentResponse.razorpay_signature,
              });

              toast.success(
                "Payment successful! Your booking is confirmed."
              );

              // ==========================
              // Refresh Bookings
              // ==========================
              queryClient.invalidateQueries({
                queryKey: ["my-bookings"],
              });
            } catch (error: any) {
              toast.error(
                error?.response?.data?.message ||
                  "Payment verification failed."
              );
            }
          },

          theme: {
            color: "#10b981",
          },
        });

      razorpay.open();
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Unable to start payment."
      );
    },
  });

  // ==========================
  // Pay Now Handler
  // ==========================
  const handlePayment = (
    bookingId: string
  ) => {
    paymentMutation.mutate(bookingId);
  };

  // ==========================
  // Loading Skeleton
  // ==========================
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-3xl border border-slate-800 bg-[#162032]"
            >
              {/* Event Banner */}
              <div className="h-44 w-full bg-slate-800 sm:h-52" />

              {/* Booking Details */}
              <div className="space-y-4 p-5 sm:p-6">
                {/* Title */}
                <div className="h-7 w-3/4 rounded-lg bg-slate-800" />

                {/* Location */}
                <div className="h-5 w-2/3 rounded-lg bg-slate-800" />

                {/* Date */}
                <div className="h-5 w-4/5 rounded-lg bg-slate-800" />

                {/* Tickets */}
                <div className="flex justify-between">
                  <div className="h-5 w-20 rounded-lg bg-slate-800" />

                  <div className="h-5 w-10 rounded-lg bg-slate-800" />
                </div>

                {/* Total */}
                <div className="flex justify-between">
                  <div className="h-5 w-16 rounded-lg bg-slate-800" />

                  <div className="h-6 w-20 rounded-lg bg-slate-800" />
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="h-7 w-24 rounded-full bg-slate-800" />

                  <div className="h-7 w-28 rounded-full bg-slate-800" />
                </div>

                {/* Buttons */}
                <div className="space-y-3 pt-2">
                  <div className="h-12 w-full rounded-xl bg-slate-800" />

                  <div className="h-12 w-full rounded-xl bg-slate-800" />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  }

  // ==========================
  // Error
  // ==========================
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
          <span className="text-3xl">
            ⚠️
          </span>
        </div>

        {/* Message */}
        <h2 className="mt-6 text-2xl font-bold text-white">
          Unable to Load Bookings
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
          We couldn't load your bookings
          right now. Please check your
          connection and try again.
        </p>

        {/* Retry */}
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  const bookings = data?.data ?? [];

  // ==========================
  // No Bookings
  // ==========================
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
          <span className="text-3xl">
            🎟️
          </span>
        </div>

        {/* Message */}
        <h2 className="mt-6 text-2xl font-bold text-white">
          No Bookings Yet
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
          You haven't booked any events yet.
          Explore upcoming events and find
          something you'll enjoy.
        </p>

        {/* Action */}
        <button
          type="button"
          onClick={() =>
            (window.location.href =
              "/events")
          }
          className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          Explore Events
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* ==========================
          Page Header
      ========================== */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          My Bookings
        </h1>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Manage your event bookings and
          payments.
        </p>
      </div>

      {/* ==========================
          Bookings Grid
      ========================== */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
        {bookings.map(
          (booking: any) => (
            <div
              key={booking._id}
              className="overflow-hidden rounded-3xl border border-slate-800 bg-[#162032]"
            >
              {/* ==========================
                  Event Banner
              ========================== */}
              {booking.event?.banner ? (
                <img
                  src={booking.event.banner}
                  alt={
                    booking.event.title
                  }
                  className="h-44 w-full object-cover sm:h-52"
                />
              ) : (
                <div className="flex h-44 items-center justify-center bg-[#0B1120] sm:h-52">
                  <span className="text-sm text-slate-500">
                    No banner available
                  </span>
                </div>
              )}

              {/* ==========================
                  Booking Details
              ========================== */}
              <div className="space-y-4 p-5 sm:p-6">
                {/* Event Title */}
                <h2 className="line-clamp-2 break-words text-xl font-bold text-white sm:text-2xl">
                  {booking.event?.title ||
                    "Event"}
                </h2>

                {/* Location */}
                <p className="break-words text-sm leading-6 text-slate-400 sm:text-base">
                  📍{" "}
                  {booking.event?.location ||
                    "Location unavailable"}
                </p>

                {/* Date */}
                <p className="break-words text-sm leading-6 text-slate-400 sm:text-base">
                  📅{" "}
                  {booking.event
                    ?.startDateTime
                    ? new Date(
                        booking.event.startDateTime
                      ).toLocaleString()
                    : "Date unavailable"}
                </p>

                {/* Tickets */}
                <div className="flex items-center justify-between gap-4 text-sm sm:text-base">
                  <span className="text-slate-400">
                    🎟️ Tickets
                  </span>

                  <span className="shrink-0 font-semibold text-white">
                    {booking.quantity}
                  </span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-400 sm:text-base">
                    💰 Total
                  </span>

                  <span className="shrink-0 text-lg font-bold text-emerald-400">
                    ₹{booking.totalPrice}
                  </span>
                </div>

                {/* ==========================
                    Status
                ========================== */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {/* Booking Status */}
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium sm:text-sm ${
                      booking.bookingStatus ===
                      "confirmed"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : booking.bookingStatus ===
                          "cancelled"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {booking.bookingStatus}
                  </span>

                  {/* Payment Status */}
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium sm:text-sm ${
                      booking.paymentStatus ===
                      "paid"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : booking.paymentStatus ===
                          "failed"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    Payment:{" "}
                    {booking.paymentStatus}
                  </span>
                </div>

                {/* ==========================
                    Pay Now
                ========================== */}
                {booking.bookingStatus !==
                  "cancelled" &&
                  booking.paymentStatus !==
                    "paid" && (
                    <button
                      type="button"
                      onClick={() =>
                        handlePayment(
                          booking._id
                        )
                      }
                      disabled={
                        paymentMutation.isPending
                      }
                      className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
                    >
                      {paymentMutation.isPending
                        ? "Opening Payment..."
                        : "Pay Now"}
                    </button>
                  )}

                {/* ==========================
                    Cancel Booking
                ========================== */}
                {booking.bookingStatus !==
                  "cancelled" &&
                  booking.paymentStatus !==
                    "paid" && (
                    <button
                      type="button"
                      onClick={() =>
                        handleCancelBooking(
                          booking._id
                        )
                      }
                      disabled={
                        cancelMutation.isPending
                      }
                      className="w-full rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
                    >
                      {cancelMutation.isPending
                        ? "Cancelling..."
                        : "Cancel Booking"}
                    </button>
                  )}

                {/* ==========================
                    Paid Message
                ========================== */}
                {booking.paymentStatus ===
                  "paid" &&
                  booking.bookingStatus ===
                    "confirmed" && (
                    <div className="rounded-xl bg-emerald-500/10 px-4 py-3 text-center text-sm leading-5 text-emerald-400">
                      ✓ Payment completed
                      successfully
                    </div>
                  )}

                {/* ==========================
                    Cancelled Message
                ========================== */}
                {booking.bookingStatus ===
                  "cancelled" && (
                  <div className="rounded-xl bg-red-500/10 px-4 py-3 text-center text-sm leading-5 text-red-400">
                    This booking has been
                    cancelled.
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default MyBookings;