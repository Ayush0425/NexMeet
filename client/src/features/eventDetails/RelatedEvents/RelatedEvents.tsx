import { events } from "../../../data/events";
import EventCard from "../../events/EventCard/EventCard";

type RelatedEventsProps = {
  currentEventId: string;
};

function RelatedEvents({
  currentEventId,
}: RelatedEventsProps) {
  const relatedEvents = events
    .filter((event) => event.id !== currentEventId)
    .slice(0, 3);

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-3xl font-bold text-white">
        Related Events
      </h2>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {relatedEvents.map((event) => (
          <EventCard
            key={event.id}
            {...event}
          />
        ))}
      </div>
    </section>
  );
}

export default RelatedEvents;