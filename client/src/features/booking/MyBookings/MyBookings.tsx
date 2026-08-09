import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

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

      alert(
        "Booking cancelled successfully!"
      );
    },

    onError: (error: any) => {
      console.error(error);

      alert(
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

    onSuccess: (response, bookingId) => {
      const order = response?.data?.order;
      const key = response?.key;

      if (!order || !key) {
        alert(
          "Unable to create payment order."
        );
        return;
      }

      // Open Razorpay Checkout
      const razorpay = new window.Razorpay({
        key,

        amount: order.amount,

        currency: order.currency,

        name: "NexMeet",

        description:
          "Event Booking Payment",

        order_id: order.id,

        handler: async (paymentResponse) => {
          try {
            // Verify payment on backend
            await verifyPayment({
              razorpay_order_id:
                paymentResponse.razorpay_order_id,

              razorpay_payment_id:
                paymentResponse.razorpay_payment_id,

              razorpay_signature:
                paymentResponse.razorpay_signature,
            });

            alert(
              "Payment successful! Your booking is confirmed."
            );

            // Refresh bookings
            queryClient.invalidateQueries({
              queryKey: ["my-bookings"],
            });
          } catch (error: any) {
            console.error(
              "Payment verification failed:",
              error
            );

            alert(
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
      console.error(
        "Payment order creation failed:",
        error
      );

      alert(
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
  // Loading
  // ==========================
  if (isLoading) {
    return (
      <div className="py-10 text-center text-slate-400">
        Loading your bookings...
      </div>
    );
  }

  // ==========================
  // Error
  // ==========================
  if (isError) {
    return (
      <div className="py-10 text-center text-red-400">
        Failed to load your bookings.
      </div>
    );
  }

  const bookings = data?.data ?? [];

  // ==========================
  // No Bookings
  // ==========================
  if (bookings.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold text-white">
          No Bookings Found
        </h2>

        <p className="mt-3 text-slate-400">
          Book an event to see your tickets
          here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {bookings.map((booking: any) => (
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
                alt={booking.event.title}
                className="h-52 w-full object-cover"
              />
            ) : (
              <div className="flex h-52 items-center justify-center bg-[#0B1120]">
                <span className="text-slate-500">
                  No banner available
                </span>
              </div>
            )}

            {/* ==========================
                Booking Details
            ========================== */}
            <div className="space-y-4 p-6">
              <h2 className="text-2xl font-bold text-white">
                {booking.event?.title}
              </h2>

              <p className="text-slate-400">
                📍 {booking.event?.location}
              </p>

              <p className="text-slate-400">
                📅{" "}
                {booking.event?.startDateTime
                  ? new Date(
                      booking.event.startDateTime
                    ).toLocaleString()
                  : "Date unavailable"}
              </p>

              {/* Tickets */}
              <div className="flex justify-between text-slate-400">
                <span>🎟️ Tickets</span>

                <span className="font-semibold text-white">
                  {booking.quantity}
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between">
                <span className="text-slate-400">
                  💰 Total
                </span>

                <span className="font-bold text-emerald-400">
                  ₹{booking.totalPrice}
                </span>
              </div>

              {/* ==========================
                  Status
              ========================== */}
              <div className="flex flex-wrap gap-3 pt-2">
                {/* Booking Status */}
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
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
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
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
                    className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                    className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                  <div className="rounded-xl bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-400">
                    ✓ Payment completed
                    successfully
                  </div>
                )}

              {/* ==========================
                  Cancelled Message
              ========================== */}
              {booking.bookingStatus ===
                "cancelled" && (
                <div className="rounded-xl bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
                  This booking has been
                  cancelled.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;