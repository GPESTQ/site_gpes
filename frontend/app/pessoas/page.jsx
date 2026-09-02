"use client";

import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PersonCard from "../../components/PersonCard";
import { ROLE_FILTER_OPTIONS } from "@/lib/personOptions";
import PageHeader from "../../components/PageHeader";
import ItemsNotFoundCard from "../../components/ItemsNotFoundCard";
import LoadingCard from "../../components/LoadingCard";
import api from "@/lib/axios";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Pagination";

const FILTER_OPTIONS = [
    { label: "TODOS", value: "all" },
    ...ROLE_FILTER_OPTIONS.map((option) => ({ label: option.label.toUpperCase(), value: option.value })),
];

const PersonsPage = () => {
    const [persons, setPersons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRateLimit, setIsRateLimit] = useState(false);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const filteredPersons = filter === "all" ? persons : persons.filter((p) => p.role === filter);

    const searchedPersons = filteredPersons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase()),
    );

    const { paginatedItems, currentPage, totalPages, setCurrentPage, itemsPerPage } = usePagination(searchedPersons, 9);

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const res = await api.get("/persons");
                setPersons(res.data);
                setIsRateLimit(false);
            } catch (error) {
                console.error("Failed to fetch persons", error);
                if (error.response?.status === 429) {
                    setIsRateLimit(true);
                } else {
                    toast.error("Erro ao carregar as pessoas");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchPersons();
    }, []);

    return (
        <div className="flex flex-col bg-neutral-50 min-h-screen">
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

            <main className="flex-1">
                <PageHeader
                    title="Pessoas"
                    subtitle="Conheça os pesquisadores, professores e alunos que fazem parte do GPES."
                    breadcrumb="Início / Pessoas"
                    filterOptions={FILTER_OPTIONS}
                    filterActive={filter}
                    filterOnChange={setFilter}
                    search={search}
                    setSearch={setSearch}
                    searchPlaceholder="Buscar por nome..."
                />

                <div className="px-4 lg:px-20 py-6">
                    {isLoading && <LoadingCard text={"Carregando pessoas..."} />}

                    {!isLoading && !isRateLimit && (
                        <>
                            {searchedPersons.length > 0 ? (
                                <div className="flex flex-col gap-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        {paginatedItems.map((person) => (
                                            <PersonCard key={person.id} person={person} />
                                        ))}
                                    </div>
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={setCurrentPage}
                                        items={searchedPersons.length}
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

export default PersonsPage;
