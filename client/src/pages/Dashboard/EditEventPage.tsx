import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getEventById } from "../../services/event/event.service";

function EditEventPage() {
  const { id } = useParams();

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center text-white">
        Loading event...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load event.
      </div>
    );
  }

  const event = data?.data;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">
        Edit Event
      </h1>

      <div className="rounded-2xl bg-[#162032] p-6 text-white">
        <p>
          <strong>Title:</strong> {event.title}
        </p>

        <p>
          <strong>Location:</strong> {event.location}
        </p>

        <p>
          <strong>Price:</strong> ₹{event.price}
        </p>

        <p>
          <strong>Seats:</strong> {event.totalSeats}
        </p>
      </div>
    </div>
  );
}

export default EditEventPage;