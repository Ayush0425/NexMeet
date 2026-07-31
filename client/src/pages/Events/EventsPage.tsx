import { useState } from "react";

import { events } from "../../data/events";

import SearchBar from "../../features/events/SearchBar/SearchBar";
import Filters from "../../features/events/Filters/Filters";
import EventGrid from "../../features/events/EventGrid/EventGrid";
import Pagination from "../../features/events/Pagination/Pagination";

function EventsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents = events.filter((event) => {
    const query = search.toLowerCase();

    const matchesSearch =
      event.title.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query) ||
      event.category.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#0B1120]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-2 text-4xl font-bold text-white">
          Explore Events
        </h1>

        <p className="mb-10 text-slate-400">
          Discover concerts, hackathons, workshops and conferences near you.
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
          <EventGrid events={filteredEvents} />
        </div>

        <Pagination />
      </div>
    </main>
  );
}

export default EventsPage;