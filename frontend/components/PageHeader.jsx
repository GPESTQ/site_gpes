import FilterBar from "@/components/FilterBar";
import SearchInput from "@/components/ui/SearchInput";

const PageHeader = ({
    breadcrumb,
    title,
    subtitle,
    filterOptions,
    filterActive,
    filterOnChange,
    search,
    setSearch,
    searchPlaceholder = "Buscar...",
    smallTitle,
}) => {
    return (
        <div className="flex flex-col bg-neutral-950 px-4 lg:px-20 py-4 lg:py-6 gap-6 pt-28.25 lg:pt-45.5">
            <div className="flex flex-col gap-2 lg:gap-3">
                <span className="text-neutral-300 text-sm font-sans font-medium">{breadcrumb}</span>
                <h1 className={`font-display text-neutral-50 font-bold ${smallTitle ? "text-4xl lg:text-5xl" : "text-5xl lg:text-6xl"}`}>{title}</h1>
                {subtitle && <p className="text-neutral-300 font-sans text-sm lg:text-base">{subtitle}</p>}
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-0">
                {filterOptions && <FilterBar filterOptions={filterOptions} filterActive={filterActive} filterOnChange={filterOnChange} />}
                {setSearch && (
                    <SearchInput value={search} onChange={setSearch} placeholder={searchPlaceholder} />
                )}
            </div>
        </div>
    );
};
export default PageHeader;
