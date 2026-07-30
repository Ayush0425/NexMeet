import { Search, Ticket, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover Events",
    description:
      "Browse concerts, hackathons, workshops and meetups happening around you.",
  },
  {
    icon: Ticket,
    title: "Book Your Ticket",
    description:
      "Reserve your seat securely in just a few clicks with instant confirmation.",
  },
  {
    icon: PartyPopper,
    title: "Enjoy the Experience",
    description:
      "Attend amazing events, connect with people and create unforgettable memories.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-[#0B1120] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 uppercase tracking-widest text-emerald-400 font-semibold">
            How It Works
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Book Events in 3 Simple Steps
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-slate-400">
            Finding and booking your favorite events has never been easier.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-800 bg-[#162032] p-8 text-center"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
                  <Icon
                    size={36}
                    className="text-emerald-400"
                  />
                </div>

                <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                  {index + 1}
                </div>

                <h3 className="mb-3 text-2xl font-semibold text-white">
                  {step.title}
                </h3>

                <p className="text-slate-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;