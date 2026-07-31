import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search events..."
        className="w-full rounded-2xl border border-slate-700 bg-[#162032] py-4 pl-14 pr-4 text-white outline-none transition focus:border-emerald-500"
      />
    </div>
  );
}

export default SearchBar;