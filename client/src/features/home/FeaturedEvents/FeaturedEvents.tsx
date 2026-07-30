import EventCard from "../EventCard/EventCard";



const events = [
  {
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    title: "Jaipur Music Fest",
    category: "Music",
    location: "Jaipur, Rajasthan",
    date: "12 AUG",
    rating: 4.9,
    attendees: "2500+",
    price: "₹499",
  },
  {
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    title: "CodeStorm Hackathon",
    category: "Tech",
    location: "Delhi",
    date: "20 AUG",
    rating: 4.8,
    attendees: "1500+",
    price: "Free",
  },
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    title: "Startup Meetup",
    category: "Business",
    location: "Bangalore",
    date: "28 AUG",
    rating: 4.7,
    attendees: "800+",
    price: "₹299",
  },
];

function FeaturedEvents() {
  return (
    <section className="bg-[#0B1120] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-emerald-400">
            Featured Events
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Discover Events You'll Love
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-slate-400">
            Explore trending concerts, hackathons, startup meetups,
            workshops and much more.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event.title}
              {...event}
            />
          ))}
        </div>

        {/* View All */}
        <div className="mt-14 flex justify-center">
          <button className="rounded-xl border border-emerald-500 px-8 py-4 font-semibold text-emerald-400 transition hover:bg-emerald-500 hover:text-white">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedEvents;