import { useState, type FormEvent } from "react";
import { ArrowRight, Calendar, CheckCircle2, QrCode, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const QUICK_TAGS = [
  { label: "Tech & AI", category: "Tech" },
  { label: "Live Music", category: "Music" },
  { label: "Founder Meetups", category: "Business" },
  { label: "Workshops", category: "Education" },
  { label: "Free Entry", category: "All" },
];

function HeroContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/events");
    }
  };

  const handleTagClick = (category: string) => {
    if (category === "All") {
      navigate("/events");
    } else {
      navigate(`/events?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <div className="max-w-2xl space-y-7 py-6 lg:py-10">
      {/* Live Badge */}
      <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
        </span>
        <span>NexMeet 2.0 • Live Event Discovery & Ticketing</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15]">
          Events that bring <br />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
            people together.
          </span>
        </h1>

        <p className="max-w-xl text-base sm:text-lg leading-relaxed text-slate-600">
          From developer hackathons and founder dinners to live music and design workshops — discover what's happening near you or host your own with instant digital passes.
        </p>
      </div>

      {/* Interactive Hero Search Bar */}
      <form onSubmit={handleSearch} className="relative max-w-xl">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-2xl border border-slate-300 bg-white p-2 shadow-xl shadow-slate-200/60 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
          <div className="flex flex-1 items-center gap-3 px-3 py-1.5 sm:py-0">
            <Search className="h-5 w-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events, cities, or topics (e.g. Hackathon, Bangalore)..."
              className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-500 shrink-0 active:scale-[0.98]"
          >
            <span>Search</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Tag Shortcuts */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-amber-500" /> Popular:
          </span>
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => handleTagClick(tag.category)}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-2xs"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </form>

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Link
          to="/events"
          className="flex items-center gap-2.5 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-500"
        >
          <Calendar className="h-4 w-4 text-emerald-100" />
          Browse All Events
        </Link>

        <Link
          to="/dashboard/create-event"
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-2xs transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
        >
          Host an Event
          <ArrowRight className="h-4 w-4 text-slate-500" />
        </Link>
      </div>

      {/* Real Product Value Highlights */}
      <div className="flex flex-wrap items-center gap-y-3 gap-x-6 border-t border-slate-200/80 pt-6 text-xs font-medium text-slate-500">
        <div className="flex items-center gap-2">
          <QrCode className="h-4 w-4 text-emerald-600" />
          <span>Instant QR Code Tickets</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Razorpay Verified Payments</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>Real-Time Host Dashboard</span>
        </div>
      </div>
    </div>
  );
}

export default HeroContent;