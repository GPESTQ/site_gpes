"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CircleNotchIcon, FloppyDiskIcon } from "@phosphor-icons/react";

import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import InputField from "@/components/admin/InputField";
import FileInput from "@/components/admin/FileInput";
import Button from "@/components/ui/Button";
import AdminFooter from "@/components/admin/AdminFooter";
import LoadingCard from "@/components/LoadingCard";
import api from "@/lib/axios";
import useEditPartner from "../hooks/useEditPartner";
import Image from "next/image";

const EditPartnerPage = () => {
    const {
        tradeName,
        setTradeName,
        siteUrl,
        setSiteUrl,
        logoFile,
        setLogoFile,
        currentLogoUrl,
        isFetching,
        isLoading,
        handleSubmit,
    } = useEditPartner();

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <AdminNavbar setIsOpen={setIsNavbarOpen} />
            <AdminSidebar isOpen={isNavbarOpen} actived={"partners"} />

            <main className="pt-20 lg:pl-60 flex-1">
                <AdminPageHeader
                    breadcrumb="Painel de Controle / Apoiadores / Editar Apoiador"
                    title="Editar Apoiador"
                    subtitle="Atualize as informações do apoiador selecionado."
                    backLink="/admin/apoiadores"
                />

                <div className="px-4 lg:px-6">
                    {isFetching && <LoadingCard text="Carregando dados do apoiador..." />}

                    {!isFetching && (
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="flex justify-center mb-2 lg:order-2">
                                <Image
                                    src={
                                        logoFile
                                            ? URL.createObjectURL(logoFile)
                                            : currentLogoUrl || "/profile-image-placeholder.png"
                                    }
                                    alt={"Logo do apoiador"}
                                    width={360}
                                    height={240}
                                    className="rounded-lg object-contain w-90 h-60"
                                    unoptimized
                                />
                            </div>

                            <form onSubmit={handleSubmit} className="max-w-2xl flex-1 grid gap-y-4">
                                <InputField
                                    id="tradeName"
                                    label="Nome Fantasia *"
                                    disabled={isLoading}
                                    value={tradeName}
                                    onChange={(e) => setTradeName(e.target.value)}
                                    required
                                />

                                <InputField
                                    id="siteUrl"
                                    label="Site"
                                    disabled={isLoading}
                                    value={siteUrl}
                                    onChange={(e) => setSiteUrl(e.target.value)}
                                />

                                <FileInput
                                    id="logoFile"
                                    label="Logo"
                                    accept="image/png, image/jpeg, image/webp"
                                    disabled={isLoading}
                                    showWarning={true}
                                    warningText="Atenção: caso não selecione uma nova logo, será mantida a atual."
                                    onChange={(e) => {
                                        if (e.target.files?.[0]) setLogoFile(e.target.files[0]);
                                    }}
                                />

                                <Button type="submit" isLoading={isLoading} className="justify-self-end mt-2">
                                    <FloppyDiskIcon size={24} />
                                    {isLoading ? (
                                        <CircleNotchIcon size={24} className="animate-spin" />
                                    ) : (
                                        "SALVAR ALTERAÇÕES"
                                    )}
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </main>

            <AdminFooter />
        </div>
    );
};
export default EditPartnerPage;
