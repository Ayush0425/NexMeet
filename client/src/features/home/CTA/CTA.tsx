import { ArrowRight, CalendarPlus, Compass, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="relative bg-slate-50/80 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-8 sm:p-14 shadow-2xl shadow-emerald-900/15 text-white">
          {/* Subtle Ambient Shapes */}
          <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-white/10 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-teal-400/20 blur-[90px]" />

          <div className="relative z-10 mx-auto max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-emerald-100 backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>JOIN 10,000+ EVENT ENTHUSIASTS</span>
            </div>

            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
              Ready to experience or host your next great gathering?
            </h2>

            <p className="text-sm sm:text-base text-emerald-50 max-w-2xl mx-auto leading-relaxed">
              Explore upcoming experiences in your city, or launch your own event page in minutes with automated QR passes and zero hassle.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/events"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-emerald-900 shadow-lg transition hover:bg-slate-100 active:scale-95"
              >
                <Compass className="h-4 w-4 text-emerald-700" />
                Explore Events
              </Link>

              <Link
                to="/dashboard/create-event"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-emerald-700/40 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <CalendarPlus className="h-4 w-4 text-emerald-200" />
                Create an Event
                <ArrowRight className="h-4 w-4 text-emerald-200" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;