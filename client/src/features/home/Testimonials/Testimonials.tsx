import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Robin Smith",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=11",
    review:
      "NexMeet made booking tech events effortless. The UI is beautiful and the experience was seamless.",
  },
  {
    name: "Sofia Garcia",
    role: "College Student",
    image: "https://i.pravatar.cc/150?img=5",
    review:
      "I discovered amazing hackathons through NexMeet. Definitely my go-to platform for events.",
  },
  {
    name: "Jack Lucas",
    role: "Startup Founder",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "The event discovery experience is smooth and professional. Highly recommended!",
  },
];

function Testimonials() {
  return (
    <section className="bg-[#0B1120] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-emerald-400">
            Testimonials
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            What Our Users Say
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Thousands of people trust NexMeet to discover and book amazing
            events.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((user) => (
            <div
              key={user.name}
              className="rounded-2xl border border-slate-800 bg-[#162032] p-8"
            >
              <div className="mb-5 flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mb-8 text-slate-300 leading-7">
                "{user.review}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-semibold text-white">
                    {user.name}
                  </h4>

                  <p className="text-sm text-slate-400">
                    {user.role}
                  </p>
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