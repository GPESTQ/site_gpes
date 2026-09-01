import { MagnifyingGlassIcon } from "@phosphor-icons/react";

const SearchInput = ({ value, onChange, placeholder = "Buscar...", className = "" }) => (
    <div className="relative flex max-w-96">
        <MagnifyingGlassIcon size={24} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600" />
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`flex-1 bg-neutral-50 rounded-lg border border-neutral-400 pl-4 pr-12 py-3 text-neutral-950 font-sans placeholder:text-neutral-400 text-sm ${className}`}
        />
    </div>
);
export default SearchInput;