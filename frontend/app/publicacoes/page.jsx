"use client";

import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaperCard from "../../components/PaperCard";
import { PAPER_TYPE_FILTER_OPTIONS } from "@/lib/papersOptions";
import PageHeader from "../../components/PageHeader";
import ItemsNotFoundCard from "../../components/ItemsNotFoundCard";
import LoadingCard from "../../components/LoadingCard";
import api from "@/lib/axios";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Pagination";

const FILTER_OPTIONS = [
    { label: "TODOS", value: "all" },
    ...PAPER_TYPE_FILTER_OPTIONS.map((option) => ({ label: option.label.toUpperCase(), value: option.value })),
];

const PapersPage = () => {
    const [papers, setPapers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRateLimit, setIsRateLimit] = useState(false);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const filteredPapers = filter === "all" ? papers : papers.filter((p) => p.type === filter);

    const searchedPapers = filteredPapers.filter((paper) => paper.title.toLowerCase().includes(search.toLowerCase()));

    const { paginatedItems, currentPage, totalPages, setCurrentPage, itemsPerPage } = usePagination(searchedPapers, 9);

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const res = await api.get("/papers");
                setPapers(res.data);
                setIsRateLimit(false);
            } catch (error) {
                console.error("Failed to fetch papers", error);
                if (error.response?.status === 429) {
                    setIsRateLimit(true);
                } else {
                    toast.error("Erro ao carregar as publicações");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchPapers();
    }, []);

    return (
        <div className="flex flex-col bg-neutral-50 min-h-screen">
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

            <main className="flex-1">
                <PageHeader
                    title="Publicações"
                    subtitle="Confira os artigos científicos e trabalhos publicados pelo GPES em eventos e revistas."
                    breadcrumb="Início / Publicações"
                    filterOptions={FILTER_OPTIONS}
                    filterActive={filter}
                    filterOnChange={setFilter}
                    search={search}
                    setSearch={setSearch}
                    searchPlaceholder="Buscar por título..."
                />

                <div className="px-4 lg:px-20 py-6">
                    {isLoading && <LoadingCard text={"Carregando publicações..."} />}

                    {!isLoading && !isRateLimit && (
                        <>
                            {searchedPapers.length > 0 ? (
                                <div className="flex flex-col gap-6">
                                    {paginatedItems.map((paper) => (
                                        <PaperCard key={paper.id} paper={paper} />
                                    ))}
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={setCurrentPage}
                                        items={searchedPapers.length}
                                        itemsPerPage={itemsPerPage}
                                    />
                                </div>
                            ) : (
                                <ItemsNotFoundCard />
                            )}
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PapersPage;
