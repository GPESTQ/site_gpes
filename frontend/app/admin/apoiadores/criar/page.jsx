"use client";
import { useState } from "react";
import { CircleNotchIcon, PlusIcon } from "@phosphor-icons/react";

import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import InputField from "@/components/admin/InputField";
import FileInput from "@/components/admin/FileInput";
import Button from "@/components/ui/Button";
import AdminFooter from "@/components/admin/AdminFooter";
import Image from "next/image";
import useCreatePartner from "../hooks/useCreatePartner";

const CreatePartnerPage = () => {
    const {
        tradeName,
        setTradeName,
        siteUrl,
        setSiteUrl,
        logoFile,
        setLogoFile,
        isLoading,
        handleSubmit,
    } = useCreatePartner();

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <AdminNavbar setIsOpen={setIsNavbarOpen} />
            <AdminSidebar isOpen={isNavbarOpen} actived={"partners"} />

            <main className="pt-20 lg:pl-60 flex-1">
                <AdminPageHeader
                    breadcrumb="Painel de Controle / Apoiadores / Adicionar Apoiador"
                    title="Adicionar Apoiador"
                    subtitle="Preencha os dados abaixo para cadastrar um novo apoiador."
                    backLink="/admin/apoiadores"
                />

                <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-6">
                    <div className="flex justify-center mb-2 lg:order-2">
                        <Image
                            src={
                                logoFile
                                    ? URL.createObjectURL(logoFile)
                                    : "/image-placeholder.png"
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
                            placeholder="Ex: Fatec Taquaritinga"
                            disabled={isLoading}
                            value={tradeName}
                            onChange={(e) => setTradeName(e.target.value)}
                            required
                        />

                        <InputField
                            id="siteUrl"
                            label="Site"
                            placeholder="Ex: https://www.fatectq.edu.br"
                            disabled={isLoading}
                            value={siteUrl}
                            onChange={(e) => setSiteUrl(e.target.value)}
                        />

                        <FileInput
                            id="logoFile"
                            label="Logo"
                            accept="image/png, image/jpeg, image/webp"
                            disabled={isLoading}
                            hasFile={!!logoFile}
                            hintRight="Fundo transparente recomendado"
                            onChange={(e) => {
                                if (e.target.files?.[0]) setLogoFile(e.target.files[0]);
                            }}
                            warningText="Atenção: caso não selecione uma logo, será utilizado uma imagem padrão."
                        />

                        <Button type="submit" isLoading={isLoading} className="justify-self-end mt-2">
                            <PlusIcon size={24} />
                            {isLoading ? <CircleNotchIcon size={24} className="animate-spin" /> : "ADICIONAR APOIADOR"}
                        </Button>
                    </form>
                </div>
            </main>

            <AdminFooter />
        </div>
    );
};
export default CreatePartnerPage;