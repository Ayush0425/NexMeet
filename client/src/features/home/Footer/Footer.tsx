import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

function Footer() {
  const socialIcons = [
    FaFacebook,
    FaInstagram,
    FaXTwitter,
    FaLinkedin,
    FaGithub,
  ];

  return (
    <footer className="border-t border-slate-800 bg-[#0B1120]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-emerald-400">
              NexMeet
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Discover amazing events, connect with people, and create
              unforgettable experiences with NexMeet.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-slate-400">
              <li>
                <a href="#" className="transition hover:text-emerald-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-emerald-400">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-emerald-400">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-emerald-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Support
            </h3>

            <ul className="space-y-3 text-slate-400">
              <li>
                <a href="#" className="transition hover:text-emerald-400">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-emerald-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-emerald-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-emerald-400">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Follow Us
            </h3>

            <div className="flex gap-4">
              {socialIcons.map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="rounded-full border border-slate-700 p-3 text-slate-400 transition hover:border-emerald-400 hover:text-emerald-400"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} NexMeet. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;