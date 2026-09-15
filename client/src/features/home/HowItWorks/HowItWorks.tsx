import { QrCode, ScanLine, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Zap,
    badge: "For Attendees",
    title: "Instant 1-Click Ticket Booking",
    description:
      "Reserve free passes or purchase tickets securely via Razorpay in seconds without tedious multi-page checkout forms.",
  },
  {
    icon: QrCode,
    badge: "Digital Passes",
    title: "Always-Ready QR Code Wallet",
    description:
      "Never lose your tickets. Access high-resolution verifiable QR passes right from your NexMeet dashboard or email anytime.",
  },
  {
    icon: ScanLine,
    badge: "For Organizers",
    title: "Instant Camera Gate Check-In",
    description:
      "Organizers can check in hundreds of attendees effortlessly at the venue entrance using our built-in mobile camera scanner.",
  },
  {
    icon: ShieldCheck,
    badge: "Host Tools",
    title: "Live Sales & Attendee Analytics",
    description:
      "Monitor revenue in real time, view buyer rosters, manage seat capacity, and export attendee lists whenever you need.",
  },
];

function HowItWorks() {
  return (
    <section className="relative border-b border-slate-200/80 bg-slate-50/70 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Engineered for Modern Gatherings
          </p>

          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Everything you need to discover or host
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600">
            From casual community meetups to 1,000+ attendee summits, NexMeet replaces clunky ticketing tools with speed and craft.
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/70"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{index + 1}
                    </span>
                  </div>

                  <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-3 border border-slate-200">
                    {item.badge}
                  </span>

                  <h3 className="text-base font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Organizer Callout */}
        <div className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-slate-900">Are you planning an upcoming event?</h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">Set up ticketing, manage bookings, and generate automated passes with zero upfront platform fees.</p>
          </div>
          <Link
            to="/dashboard/create-event"
            className="rounded-xl bg-emerald-600 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-500 shrink-0"
          >
            Create Your Event Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;