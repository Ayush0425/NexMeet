type FiltersProps = {
  selected: string;
  onSelect: (category: string) => void;
};

const filters = [
  "All",
  "Music",
  "Technology",
  "Workshop",
  "Sports",
  "Business",
];

function Filters({ selected, onSelect }: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onSelect(filter)}
          className={`rounded-full px-5 py-2 font-medium transition ${
            selected === filter
              ? "bg-emerald-500 text-white"
              : "bg-[#162032] text-slate-300 hover:bg-emerald-500 hover:text-white"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default Filters;