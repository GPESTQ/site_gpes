const FilterBar = ({ filterOptions, filterActive, filterOnChange }) => (
    <div className="flex items-center gap-3 overflow-x-auto">
        {filterOptions.map((option) => (
            <button
                key={option.value}
                onClick={() => filterOnChange(option.value)}
                className={`px-4 py-3 text-sm font-sans font-medium cursor-pointer rounded-lg text-nowrap
                    ${filterActive === option.value
                        ? "bg-primary-700 text-neutral-50"
                        : "text-neutral-50"
                    }`}
            >
                {option.label}
            </button>
        ))}
    </div>
);

export default FilterBar;