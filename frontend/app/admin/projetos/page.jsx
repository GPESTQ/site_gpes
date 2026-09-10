"use client";
import { useState } from "react";
import { PlusIcon } from "@phosphor-icons/react";

import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminFooter from "@/components/admin/AdminFooter";
import LinkButton from "@/components/ui/LinkButton";
import {
    AdminTable,
    AdminTableHead,
    AdminTableHeader,
    AdminTableBody,
    AdminTableRow,
    AdminTableCell,
    AdminTableActions,
} from "@/components/admin/AdminTable";
import LoadingCard from "@/components/LoadingCard";
import ItemsNotFoundCard from "@/components/ItemsNotFoundCard";
import SearchInput from "@/components/ui/SearchInput";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Pagination";
import useProjects from "@/hooks/useProjects";
import useDeleteProject from "./hooks/useDeleteProject";

const AdminProjectsPage = () => {
    const { projects, setProjects, isRateLimited, isLoading } = useProjects();
    const { deleteProject } = useDeleteProject((deletedId) => {
        setProjects((prev) => prev.filter((project) => project.id !== deletedId));
    });

    const [search, setSearch] = useState("");
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const searchedProjects = projects.filter((project) => project.title.toLowerCase().includes(search.toLowerCase()));
    const { paginatedItems, currentPage, totalPages, setCurrentPage, itemsPerPage } = usePagination(searchedProjects, 8);

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <AdminNavbar setIsOpen={setIsNavbarOpen} />
            <AdminSidebar isOpen={isNavbarOpen} actived={"projects"} />

            <main className="pt-22 lg:pt-20 lg:pl-60 flex-1">
                <AdminPageHeader
                    breadcrumb="Painel de Controle / Projetos"
                    title="Projetos"
                    subtitle="Gerencie os projetos adicionados ao sistema."
                />

                <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-between px-4 lg:px-6">
                    <SearchInput value={search} onChange={setSearch} placeholder="Buscar por título..." />

                    <LinkButton href="/admin/projetos/criar">
                        <PlusIcon size={24} />
                        ADICIONAR PROJETO
                    </LinkButton>
                </div>

                <div className="p-4 lg:p-6">
                    {isLoading && <LoadingCard text="Carregando projetos..." />}

                    {searchedProjects.length === 0 && !isRateLimited && !isLoading && <ItemsNotFoundCard />}

                    {searchedProjects.length > 0 && (
                        <div className="flex flex-col gap-6">
                            <AdminTable>
                                <AdminTableHead>
                                    <AdminTableHeader className="text-center">#</AdminTableHeader>
                                    <AdminTableHeader className="w-4/12">Título</AdminTableHeader>
                                    <AdminTableHeader className="w-3/12">Metodologia</AdminTableHeader>
                                    <AdminTableHeader className="w-3/12">Cliente</AdminTableHeader>
                                    <AdminTableHeader className="text-center">Opções</AdminTableHeader>
                                </AdminTableHead>
                                <AdminTableBody>
                                    {paginatedItems.map((project, index) => (
                                        <AdminTableRow key={project.id}>
                                            <AdminTableCell className="text-center">{index + 1}</AdminTableCell>
                                            <AdminTableCell>{project.title}</AdminTableCell>
                                            <AdminTableCell>{project.methodology || "-"}</AdminTableCell>
                                            <AdminTableCell>{project.client || "-"}</AdminTableCell>
                                            <AdminTableActions
                                                editHref={`/admin/projetos/${project.id}`}
                                                onDelete={() => deleteProject(project.id)}
                                            />
                                        </AdminTableRow>
                                    ))}
                                </AdminTableBody>
                            </AdminTable>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                items={searchedProjects.length}
                                itemsPerPage={itemsPerPage}
                            />
                        </div>
                    )}
                </div>
            </main>

            <AdminFooter />
        </div>
    );
};
export default AdminProjectsPage;