"use client";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

const getPageNumbers = (currentPage, totalPages) => {
    const delta = 1;
    const pages = [];

    for (let page = 1; page <= totalPages; page++) {
        const isFirst = page === 1;
        const isLast = page === totalPages;
        const isNearCurrent = page >= currentPage - delta && page <= currentPage + delta;

        if (isFirst || isLast || isNearCurrent) {
            pages.push(page);
        } else if (pages[pages.length - 1] !== "...") {
            pages.push("...");
        }
    }

    return pages;
};

const Pagination = ({ currentPage, totalPages, onPageChange, items, itemsPerPage }) => {
    if (totalPages <= 1) return null;

    const pages = getPageNumbers(currentPage, totalPages);

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, items);

    return (
        <div className="flex items-center justify-between gap-2">
            <span className="font-sans text-sm text-shadow-neutral-950">{startItem}–{endItem} de {items} resultados</span>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="size-9 flex items-center justify-center rounded-lg disabled:text-neutral-400 disabled:cursor-not-allowed text-neutral-950 cursor-pointer"
                >
                    <CaretLeftIcon size={24} />
                </button>

                {pages.map((page, index) =>
                    page === "..." ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="size-8 items-center justify-center text-sm font-sans text-neutral-500 hidden sm:flex"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`size-8 flex items-center justify-center rounded-lg text-sm font-sans cursor-pointer hidden sm:flex ${
                                page === currentPage
                                    ? "bg-primary-700 text-neutral-50"
                                    : "text-neutral-950 hover:bg-neutral-200"
                            }`}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="size-9 flex items-center justify-center rounded-lg disabled:text-neutral-400 disabled:cursor-not-allowed text-neutral-950 cursor-pointer"
                >
                    <CaretRightIcon size={24} />
                </button>
            </div>
        </div>
    );
};
export default Pagination;
