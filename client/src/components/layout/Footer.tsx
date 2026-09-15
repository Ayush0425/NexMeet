import { Calendar, Heart } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-slate-200/90 bg-slate-50 text-slate-600">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-slate-900">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Nex<span className="text-emerald-600">Meet</span></span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500">
              The modern discovery, ticketing, and check-in platform for community events, hackathons, concerts, and tech summits.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900 shadow-2xs"
                aria-label="GitHub"
              >
                <FaGithub size={15} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900 shadow-2xs"
                aria-label="Twitter"
              >
                <FaXTwitter size={15} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900 shadow-2xs"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={15} />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/events" className="transition hover:text-emerald-700">
                  Explore Events
                </Link>
              </li>
              <li>
                <Link to="/events?category=Tech" className="transition hover:text-emerald-700">
                  Tech & Hackathons
                </Link>
              </li>
              <li>
                <Link to="/events?category=Music" className="transition hover:text-emerald-700">
                  Music & Festivals
                </Link>
              </li>
              <li>
                <Link to="/dashboard/create-event" className="transition hover:text-emerald-700">
                  Host an Event
                </Link>
              </li>
            </ul>
          </div>

          {/* For Organizers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Organizers</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/dashboard" className="transition hover:text-emerald-700">
                  Organizer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/check-in" className="transition hover:text-emerald-700">
                  Mobile QR Check-in
                </Link>
              </li>
              <li>
                <Link to="/register" className="transition hover:text-emerald-700">
                  Create Host Account
                </Link>
              </li>
              <li>
                <Link to="/dashboard/my-events" className="transition hover:text-emerald-700">
                  Manage Events & Rosters
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Guarantee */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
            <h4 className="text-xs font-bold text-slate-900">Instant Verification</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every NexMeet ticket is cryptographically stamped with a unique QR passcode for tamper-proof gate verification.
            </p>
            <div className="pt-1 text-[11px] text-emerald-700 font-semibold">
              ✓ Verified by NexMeet Protocol
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NexMeet Inc. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-500">
            Built with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline mx-0.5" /> for modern communities
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;