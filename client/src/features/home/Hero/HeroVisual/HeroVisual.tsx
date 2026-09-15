import { Calendar, Clock, MapPin, QrCode, ShieldCheck, Users, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HeroVisual() {
  return (
    <div className="relative hidden w-full max-w-lg items-center justify-center lg:flex lg:pl-6">
      {/* Background Soft Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-transparent blur-2xl -z-10" />

      {/* Main Digital Ticket Pass Card (Light Mode) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/70"
      >
        {/* Pass Top Banner */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80"
            alt="AI Builders Summit"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-900/80 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SPOTLIGHT EVENT
            </span>

            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-slate-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Verified Host
            </span>
          </div>

          {/* Category & Title Over Banner */}
          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Tech & AI Conference
            </span>
            <h3 className="text-xl font-bold text-white leading-tight">
              India AI Builders & Founders Summit
            </h3>
          </div>
        </div>

        {/* Pass Middle Details */}
        <div className="p-5 space-y-4 bg-white">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-200">
              <Calendar className="h-4 w-4 text-emerald-600 shrink-0" />
              <div className="truncate">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Date</p>
                <p className="font-semibold text-slate-800 truncate">Sat, Oct 24, 2026</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-200">
              <Clock className="h-4 w-4 text-amber-600 shrink-0" />
              <div className="truncate">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Time</p>
                <p className="font-semibold text-slate-800 truncate">10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
            <span className="truncate">Convention Centre, Cyber Hub, Bengaluru</span>
          </div>

          {/* Real-time Capacity Progress */}
          <div className="space-y-1.5 rounded-xl border border-slate-200 bg-slate-50/70 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <Users className="h-3.5 w-3.5 text-emerald-600" />
                Available Passes
              </span>
              <span className="font-bold text-emerald-700">88 / 100 Claimed</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-1000"
                style={{ width: "88%" }}
              />
            </div>
            <p className="text-[11px] text-amber-700 font-medium">
              🔥 High demand • Only 12 early-bird passes remaining
            </p>
          </div>
        </div>

        {/* Perforated Ticket Divider */}
        <div className="relative flex items-center justify-between px-2 bg-white">
          <div className="h-6 w-3 -translate-x-3 rounded-r-full bg-[#f8fafc] border-r border-slate-200" />
          <div className="flex-1 border-b-2 border-dashed border-slate-200 mx-2" />
          <div className="h-6 w-3 translate-x-3 rounded-l-full bg-[#f8fafc] border-l border-slate-200" />
        </div>

        {/* Pass Stub & Action */}
        <div className="p-5 pt-3 flex items-center justify-between bg-slate-50 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Entry Pass</p>
              <p className="text-base font-bold text-slate-900">₹499 <span className="text-xs font-normal text-slate-500">/ person</span></p>
            </div>
          </div>

          <Link
            to="/events"
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-500 active:scale-95"
          >
            <span>Book Pass</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default HeroVisual;