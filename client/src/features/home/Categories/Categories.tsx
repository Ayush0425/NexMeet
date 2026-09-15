import {
  Briefcase,
  Code2,
  GraduationCap,
  Music,
  Palette,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Tech & Hackathons",
    categoryParam: "Tech",
    icon: Code2,
    tagline: "Hackathons, AI summits, developer meetups & demo days",
    accent: "text-cyan-700 bg-cyan-50 border-cyan-200",
  },
  {
    title: "Music & Festivals",
    categoryParam: "Music",
    icon: Music,
    tagline: "Live acoustic sessions, gigs, underground sets & indie fests",
    accent: "text-amber-700 bg-amber-50 border-amber-200",
  },
  {
    title: "Business & Startups",
    categoryParam: "Business",
    icon: Briefcase,
    tagline: "Founder mixers, investor pitches, angel syndicates & networking",
    accent: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  {
    title: "Workshops & Learning",
    categoryParam: "Education",
    icon: GraduationCap,
    tagline: "Hands-on bootcamps, masterclasses, and career development",
    accent: "text-indigo-700 bg-indigo-50 border-indigo-200",
  },
  {
    title: "Sports & Community",
    categoryParam: "Sports",
    icon: Trophy,
    tagline: "Marathons, esports championships, tournaments & outdoor treks",
    accent: "text-rose-700 bg-rose-50 border-rose-200",
  },
  {
    title: "Art & Culture",
    categoryParam: "Art",
    icon: Palette,
    tagline: "Gallery showcases, photography walks, comedy & theater",
    accent: "text-purple-700 bg-purple-50 border-purple-200",
  },
];

function Categories() {
  return (
    <section className="relative border-b border-slate-200/80 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Curated Spaces
          </p>

          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Explore by Community & Category
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Whatever your passion, find like-minded people gathering this week across major tech hubs and cultural hubs.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <Link
                key={cat.title}
                to={`/events?category=${encodeURIComponent(cat.categoryParam)}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/80"
              >
                <div>
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl border ${cat.accent} transition-transform duration-300 group-hover:scale-110 shadow-2xs`}>
                    <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-emerald-600">
                    {cat.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {cat.tagline}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 transition group-hover:translate-x-1">
                  <span>Browse events</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;