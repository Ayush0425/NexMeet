import { useEffect, useState } from "react";

import { getAllEvents } from "../../services/event/event.service";

import SearchBar from "../../features/events/SearchBar/SearchBar";
import Filters from "../../features/events/Filters/Filters";
import EventGrid from "../../features/events/EventGrid/EventGrid";
import Pagination from "../../features/events/Pagination/Pagination";

function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await getAllEvents();

      setEvents(response.data);
    } catch (error) {
      console.error(error);
      setError(true);
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

  // ==========================
  // Error
  // ==========================
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B1120] px-6">
        <div className="flex max-w-md flex-col items-center text-center">
          {/* Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
            <span className="text-3xl">
              ⚠️
            </span>
          </div>

          {/* Message */}
          <h1 className="mt-6 text-2xl font-bold text-white">
            Unable to Load Events
          </h1>

          <p className="mt-3 text-slate-400">
            We couldn't load the events right now.
            Please check your connection and try
            again.
          </p>

          {/* Retry */}
          <button
            type="button"
            onClick={fetchEvents}
            className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Try Again
          </button>
        </div>
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

        {/* ==========================
            Events / Empty Search State
        ========================== */}
        <div className="mt-10">
          {filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800">
                <span className="text-3xl">
                  🔍
                </span>
              </div>

              {/* Message */}
              <h2 className="mt-6 text-2xl font-bold text-white">
                No Events Found
              </h2>

              <p className="mt-3 max-w-md text-slate-400">
                We couldn't find any events matching
                your current search or category.
              </p>

              {/* Clear Filters */}
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <EventGrid
              events={filteredEvents}
            />
          )}
        </div>

        <Pagination />
      </div>
    </main>
  );
}

export default EventsPage;