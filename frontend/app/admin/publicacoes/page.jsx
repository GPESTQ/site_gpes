"use client";
import { useState, useEffect } from "react";
import { PlusIcon } from "@phosphor-icons/react";
import toast from "react-hot-toast";

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
import api from "@/lib/axios";
import SearchInput from "@/components/ui/SearchInput";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Pagination";
import { formatDate } from "../../../lib/utils";

const AdminPapersPage = () => {
    const [isRateLimit, setIsRateLimit] = useState(false);
    const [papers, setPapers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const searchedPapers = papers.filter((paper) => paper.title.toLowerCase().includes(search.toLowerCase()));
    const { paginatedItems, currentPage, totalPages, setCurrentPage, itemsPerPage } = usePagination(searchedPapers, 8);

    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que deseja remover essa publicação?")) return;
        try {
            await api.delete(`/papers/${id}`);
            setPapers((prev) => prev.filter((paper) => paper.id !== id));
            toast.success("Pessoa removida com sucesso!");
        } catch (error) {
            console.error("Failed to delete paper", error);
            toast.error("Erro ao remover publicação");
        }
    };

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
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <AdminNavbar setIsOpen={setIsOpen} />
            <AdminSidebar isOpen={isOpen} actived={"papers"} />

            <main className="pt-22 lg:pt-20 lg:pl-60 flex-1">
                <AdminPageHeader
                    breadcrumb="Painel de Controle / Publicações"
                    title="Publicações"
                    subtitle="Gerencie as publicações adicionadas ao sistema."
                />

                <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-between px-4 lg:px-6">
                    <SearchInput value={search} onChange={setSearch} placeholder="Buscar por título..." />

                    <LinkButton href="/admin/publicacoes/criar">
                        <PlusIcon size={24} />
                        ADICIONAR PUBLICAÇÃO
                    </LinkButton>
                </div>

                <div className="p-4 lg:p-6">
                    {isLoading && <LoadingCard text="Carregando publicações..." />}

                    {searchedPapers.length === 0 && !isRateLimit && !isLoading && <ItemsNotFoundCard />}

                    {searchedPapers.length > 0 && (
                        <div className="flex flex-col gap-6">
                            <AdminTable>
                                <AdminTableHead>
                                    <AdminTableHeader className="text-center">#</AdminTableHeader>
                                    <AdminTableHeader className="w-4/12">Título</AdminTableHeader>
                                    <AdminTableHeader className="w-3/12">Autores</AdminTableHeader>
                                    <AdminTableHeader className="w-2/12">Data de Publicação</AdminTableHeader>
                                    <AdminTableHeader className="text-center">Opções</AdminTableHeader>
                                </AdminTableHead>
                                <AdminTableBody>
                                    {paginatedItems.map((paper, index) => (
                                        <AdminTableRow key={paper.id}>
                                            <AdminTableCell className="text-center">{index + 1}</AdminTableCell>
                                            <AdminTableCell>{paper.title}</AdminTableCell>
                                            <AdminTableCell>{paper.authors.map((author) => author.person.name).join(", ")}</AdminTableCell>
                                            <AdminTableCell>{formatDate(paper.publishedAt)}</AdminTableCell>
                                            <AdminTableActions
                                                editHref={`/admin/publicacoes/${paper.id}`}
                                                onDelete={() => handleDelete(paper.id)}
                                            />
                                        </AdminTableRow>
                                    ))}
                                </AdminTableBody>
                            </AdminTable>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                items={searchedPapers.length}
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

export default AdminPapersPage;
