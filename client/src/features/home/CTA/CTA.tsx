import { ArrowRight } from "lucide-react";

function CTA() {
  return (
    <section className="bg-[#0B1120] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-16 text-center shadow-2xl md:px-16">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Ready to Discover Amazing Events?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-emerald-50">
            Join thousands of event enthusiasts. Explore concerts, hackathons,
            workshops, conferences, and much more—all in one place.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-emerald-600 transition hover:scale-105">
              Explore Events
              <ArrowRight size={18} />
            </button>

            <button className="rounded-xl border border-white px-7 py-3 font-semibold text-white transition hover:bg-white hover:text-emerald-600">
              Create Event
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;