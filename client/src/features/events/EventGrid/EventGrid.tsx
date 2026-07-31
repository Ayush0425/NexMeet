import type { Event } from "../../../types/event";
import EventCard from "../EventCard/EventCard";

type EventGridProps = {
  events: Event[];
};

function EventGrid({ events }: EventGridProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          {...event}
        />
      ))}
    </div>
  );
}

export default EventGrid;