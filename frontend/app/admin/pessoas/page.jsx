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
import { roleLabel, occupationLabel } from "@/lib/personOptions";
import SearchInput from "@/components/ui/SearchInput";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Pagination";

const AdminPersonsPage = () => {
    const [isRateLimit, setIsRateLimit] = useState(false);
    const [persons, setPersons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const searchedPersons = persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()));
    const { paginatedItems, currentPage, totalPages, setCurrentPage, itemsPerPage } = usePagination(searchedPersons, 8);

    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que deseja remover essa pessoa?")) return;
        try {
            await api.delete(`/persons/${id}`);
            setPersons((prev) => prev.filter((person) => person.id !== id));
            toast.success("Pessoa removida com sucesso!");
        } catch (error) {
            console.error("Failed to delete person", error);
            toast.error("Erro ao remover pessoa");
        }
    };

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
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <AdminNavbar setIsOpen={setIsOpen} />
            <AdminSidebar isOpen={isOpen} actived={"persons"} />

            <main className="pt-22 lg:pt-20 lg:pl-60 flex-1">
                <AdminPageHeader
                    breadcrumb="Painel de Controle / Pessoas"
                    title="Pessoas"
                    subtitle="Gerencie as pessoas adicionadas ao sistema."
                />

                <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-between px-4 lg:px-6">
                    <SearchInput value={search} onChange={setSearch} placeholder="Buscar por nome..." />

                    <LinkButton href="/admin/pessoas/criar">
                        <PlusIcon size={24} />
                        ADICIONAR PESSOA
                    </LinkButton>
                </div>

                <div className="p-4 lg:p-6">
                    {isLoading && <LoadingCard text="Carregando pessoas..." />}

                    {searchedPersons.length === 0 && !isRateLimit && !isLoading && <ItemsNotFoundCard />}

                    {searchedPersons.length > 0 && (
                        <div className="flex flex-col gap-6">
                            <AdminTable>
                                <AdminTableHead>
                                    <AdminTableHeader className="text-center">#</AdminTableHeader>
                                    <AdminTableHeader className="w-4/12">Nome</AdminTableHeader>
                                    <AdminTableHeader className="w-3/12">Cargo</AdminTableHeader>
                                    <AdminTableHeader className="w-3/12">Ocupação</AdminTableHeader>
                                    <AdminTableHeader className="text-center">Opções</AdminTableHeader>
                                </AdminTableHead>
                                <AdminTableBody>
                                    {paginatedItems.map((person, index) => (
                                        <AdminTableRow key={person.id}>
                                            <AdminTableCell className="text-center">{index + 1}</AdminTableCell>
                                            <AdminTableCell>{person.name}</AdminTableCell>
                                            <AdminTableCell>{roleLabel[person.role]}</AdminTableCell>
                                            <AdminTableCell>{occupationLabel[person.occupation]}</AdminTableCell>
                                            <AdminTableActions
                                                editHref={`/admin/pessoas/${person.id}`}
                                                onDelete={() => handleDelete(person.id)}
                                            />
                                        </AdminTableRow>
                                    ))}
                                </AdminTableBody>
                            </AdminTable>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                items={searchedPersons.length}
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

export default AdminPersonsPage;
