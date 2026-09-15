import { CheckCircle, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Lead Organizer, Jaipur Tech Week",
    badge: "Verified Organizer",
    review:
      "We managed 380+ registrations across three parallel tracks. The mobile camera QR check-in at the registration desk eliminated our morning bottleneck completely.",
    event: "Jaipur Tech Week 2026",
  },
  {
    name: "Dr. Priya Nair",
    role: "Community Lead, AI Bengaluru",
    badge: "Verified Organizer",
    review:
      "The live capacity tracker and Razorpay integration worked flawlessly. Setting up our paid workshop took under five minutes, and attendees loved the digital ticket wallet.",
    event: "Deep Learning Masterclass",
  },
  {
    name: "Kabir Sharma",
    role: "Frequent Attendee & Indie Musician",
    badge: "Active Community Member",
    review:
      "Instead of cluttering my inbox looking for PDFs, my QR pass is always right in my NexMeet dashboard. Smooth, fast, and remarkably easy to use.",
    event: "Attended 8+ Events",
  },
];

function Testimonials() {
  return (
    <section className="relative border-b border-slate-200/80 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Community Voices
          </p>

          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Trusted by creators and attendees
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600">
            See how event producers, developer communities, and cultural hosts run their gatherings with NexMeet.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/60 p-7 transition-all duration-300 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/70"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote size={20} className="text-slate-300" />
                </div>

                <p className="text-sm leading-relaxed text-slate-700 italic mb-6">
                  "{item.review}"
                </p>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      {item.name}
                      <CheckCircle size={13} className="text-emerald-600" />
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.role}</p>
                  </div>
                </div>
                <div className="mt-2 text-[11px] font-semibold text-emerald-700">
                  {item.event}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;