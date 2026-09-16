"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "../../components/ProjectCard";
import { PROJECT_STATUS_FILTER_OPTIONS } from "@/lib/projectOptions";
import PageHeader from "../../components/PageHeader";
import ItemsNotFoundCard from "../../components/ItemsNotFoundCard";
import LoadingCard from "../../components/LoadingCard";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Pagination";
import useProjects from "@/hooks/useProjects"

const FILTER_OPTIONS = [
    { label: "TODOS", value: "all" },
    ...PROJECT_STATUS_FILTER_OPTIONS.map((option) => ({ label: option.label.toUpperCase(), value: option.value })),
];

const ProjectsPage = () => {
    const { projects, isRateLimited, isLoading } = useProjects();
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.status === filter);

    const searchedProjects = filteredProjects.filter((project) => project.title.toLowerCase().includes(search.toLowerCase()));

    const { paginatedItems, currentPage, totalPages, setCurrentPage, itemsPerPage } = usePagination(searchedProjects, 9);

    return (
        <div className="flex flex-col bg-neutral-50 min-h-screen">
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

            <main className="flex-1">
                <PageHeader
                    title="Projetos"
                    subtitle="Explore os projetos de pesquisa desenvolvidos pelo GPES, do planejamento à conclusão."
                    breadcrumb="Início / Projetos"
                    filterOptions={FILTER_OPTIONS}
                    filterActive={filter}
                    filterOnChange={setFilter}
                    search={search}
                    setSearch={setSearch}
                    searchPlaceholder="Buscar por título..."
                />

                <div className="px-4 lg:px-20 py-6">
                    {isLoading && <LoadingCard text={"Carregando projetos..."} />}

                    {!isLoading && !isRateLimited && (
                        <>
                            {searchedProjects.length > 0 ? (
                                <div className="flex flex-col gap-6">
                                    {paginatedItems.map((project) => (
                                        <ProjectCard key={project.id} project={project} />
                                    ))}
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={setCurrentPage}
                                        items={searchedProjects.length}
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

export default ProjectsPage;
