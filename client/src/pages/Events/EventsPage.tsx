import { useEffect, useState } from "react";

import { getAllEvents } from "../../services/event/event.service";

import SearchBar from "../../features/events/SearchBar/SearchBar";
import Filters from "../../features/events/Filters/Filters";
import EventGrid from "../../features/events/EventGrid/EventGrid";
import Pagination from "../../features/events/Pagination/Pagination";

function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getAllEvents();

      console.log(response);

      setEvents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    const query = search.toLowerCase();

    const matchesSearch =
      event.title
        .toLowerCase()
        .includes(query) ||
      event.location
        .toLowerCase()
        .includes(query) ||
      event.category
        .toLowerCase()
        .includes(query);

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return (
      matchesSearch &&
      matchesCategory
    );
  });

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B1120]">
        <h1 className="text-2xl text-white">
          Loading Events...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1120]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-2 text-4xl font-bold text-white">
          Explore Events
        </h1>

        <p className="mb-10 text-slate-400">
          Discover concerts, hackathons,
          workshops and conferences near
          you.
        </p>

        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <div className="mt-8">
          <Filters
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        <div className="mt-10">
          <EventGrid
            events={filteredEvents}
          />
        </div>

        <Pagination />
      </div>
    </main>
  );
}

export default EventsPage;