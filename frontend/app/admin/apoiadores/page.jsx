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
import usePartners from "@/hooks/usePartners";
import useDeletePartner from "./hooks/useDeletePartner";

const AdminPartnersPage = () => {
    const { partners, setPartners, isRateLimited, isLoading } = usePartners();
    const { deletePartner } = useDeletePartner((deletedId) => {
        setPartners((prev) => prev.filter((partner) => partner.id !== deletedId));
    });

    const [search, setSearch] = useState("");
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const searchedPartners = partners.filter((partner) =>
        partner.tradeName.toLowerCase().includes(search.toLowerCase()),
    );
    const { paginatedItems, currentPage, totalPages, setCurrentPage, itemsPerPage } = usePagination(
        searchedPartners,
        8,
    );

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <AdminNavbar setIsOpen={setIsNavbarOpen} />
            <AdminSidebar isOpen={isNavbarOpen} actived={"partners"} />

            <main className="pt-22 lg:pt-20 lg:pl-60 flex-1">
                <AdminPageHeader
                    breadcrumb="Painel de Controle / Apoiadores"
                    title="Apoiadores"
                    subtitle="Gerencie os apoiadores/parceiros exibidos na página inicial."
                />

                <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-between px-4 lg:px-6">
                    <SearchInput value={search} onChange={setSearch} placeholder="Buscar por nome fantasia..." />

                    <LinkButton href="/admin/apoiadores/criar">
                        <PlusIcon size={24} />
                        ADICIONAR APOIADOR
                    </LinkButton>
                </div>

                <div className="p-4 lg:p-6">
                    {isLoading && <LoadingCard text="Carregando apoiadores..." />}

                    {searchedPartners.length === 0 && !isRateLimited && !isLoading && <ItemsNotFoundCard />}

                    {searchedPartners.length > 0 && (
                        <div className="flex flex-col gap-6">
                            <AdminTable>
                                <AdminTableHead>
                                    <AdminTableHeader className="text-center">#</AdminTableHeader>
                                    <AdminTableHeader className="w-4/12">Nome Fantasia</AdminTableHeader>
                                    <AdminTableHeader className="w-4/12">Site</AdminTableHeader>
                                    <AdminTableHeader className="text-center">Opções</AdminTableHeader>
                                </AdminTableHead>
                                <AdminTableBody>
                                    {paginatedItems.map((partner, index) => (
                                        <AdminTableRow key={partner.id}>
                                            <AdminTableCell className="text-center">{index + 1}</AdminTableCell>
                                            <AdminTableCell>{partner.tradeName}</AdminTableCell>
                                            <AdminTableCell>{partner.siteUrl || "—"}</AdminTableCell>
                                            <AdminTableActions
                                                editHref={`/admin/apoiadores/${partner.id}`}
                                                onDelete={() => deletePartner(partner.id)}
                                            />
                                        </AdminTableRow>
                                    ))}
                                </AdminTableBody>
                            </AdminTable>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                items={searchedPartners.length}
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

export default AdminPartnersPage;
