import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination() {
  return (
    <div className="mt-12 flex items-center justify-center gap-3">
      <button className="rounded-xl border border-slate-700 bg-[#162032] p-3 text-slate-300 transition hover:border-emerald-500 hover:text-emerald-400">
        <ChevronLeft size={20} />
      </button>

      <button className="rounded-xl bg-emerald-500 px-4 py-2 font-medium text-white">
        1
      </button>

      <button className="rounded-xl border border-slate-700 bg-[#162032] px-4 py-2 text-slate-300 transition hover:border-emerald-500 hover:text-emerald-400">
        2
      </button>

      <button className="rounded-xl border border-slate-700 bg-[#162032] px-4 py-2 text-slate-300 transition hover:border-emerald-500 hover:text-emerald-400">
        3
      </button>

      <button className="rounded-xl border border-slate-700 bg-[#162032] p-3 text-slate-300 transition hover:border-emerald-500 hover:text-emerald-400">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export default Pagination;