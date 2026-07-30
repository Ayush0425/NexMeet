import {
  Music,
  Code,
  Briefcase,
  Trophy,
  GraduationCap,
  Palette,
} from "lucide-react";

const categories = [
  {
    title: "Music",
    icon: Music,
    events: "120+ Events",
  },
  {
    title: "Tech",
    icon: Code,
    events: "95+ Events",
  },
  {
    title: "Business",
    icon: Briefcase,
    events: "60+ Events",
  },
  {
    title: "Sports",
    icon: Trophy,
    events: "45+ Events",
  },
  {
    title: "Education",
    icon: GraduationCap,
    events: "80+ Events",
  },
  {
    title: "Art",
    icon: Palette,
    events: "35+ Events",
  },
];

function Categories() {
  return (
    <section className="bg-[#0B1120] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-emerald-400">
            Categories
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Browse by Category
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Find events that match your interests—from music festivals and
            hackathons to business conferences and workshops.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.title}
                className="group cursor-pointer rounded-2xl border border-slate-800 bg-[#162032] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 transition group-hover:bg-emerald-500">
                  <Icon
                    size={32}
                    className="text-emerald-400 transition group-hover:text-white"
                  />
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  {category.title}
                </h3>

                <p className="mt-2 text-slate-400">
                  {category.events}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;