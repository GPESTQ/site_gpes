"use client";
import { useState } from "react";
import { CircleNotchIcon, PlusIcon } from "@phosphor-icons/react";

import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import InputField from "@/components/admin/InputField";
import Select from "@/components/admin/Select";
import PersonMultiSelect from "@/components/admin/PersonMultiSelect";
import MultiFileInput from "@/components/admin/MultiFileInput";
import Button from "@/components/ui/Button";
import AdminFooter from "@/components/admin/AdminFooter";
import usePersons from "@/hooks/usePersons";
import usePartners from "@/hooks/usePartners";
import { PROJECT_STATUS_OPTIONS } from "@/lib/projectOptions";
import useCreateProject from "../hooks/useCreateProject";

const MAX_IMAGES = 10;

const CreateProjectPage = () => {
    const {
        title,
        setTitle,
        description,
        setDescription,
        methodology,
        setMethodology,
        status,
        setStatus,
        client,
        setClient,
        partnerId,
        setPartnerId,
        startedDate,
        setStartedDate,
        endedDate,
        setEndedDate,
        memberIds,
        setMemberIds,
        imageFiles,
        setImageFiles,
        isLoading,
        handleSubmit
    } = useCreateProject();

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const { persons } = usePersons();
    const { partners } = usePartners();

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <AdminNavbar setIsOpen={setIsNavbarOpen} />
            <AdminSidebar isOpen={isNavbarOpen} actived={"projects"} />

            <main className="pt-20 lg:pl-60 flex-1">
                <AdminPageHeader
                    breadcrumb="Painel de Controle / Projetos / Adicionar Projeto"
                    title="Adicionar Projeto"
                    subtitle="Preencha os dados abaixo para cadastrar um novo projeto do grupo."
                    backLink="/admin/projetos"
                />

                <div className="max-w-2xl px-4 lg:px-6">
                    <form onSubmit={handleSubmit} className="grid gap-y-4">
                        <InputField
                            id="title"
                            label="Título *"
                            placeholder="Ex: Desenvolvimento de um novo sistema institucional para a Fatec de Taquaritinga"
                            disabled={isLoading}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                id="methodology"
                                label="Metodologia"
                                placeholder="Ex: Prototipação"
                                disabled={isLoading}
                                value={methodology}
                                onChange={(e) => setMethodology(e.target.value)}
                            />

                            <Select
                                id="status"
                                label="Status *"
                                disabled={isLoading}
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Selecione uma opção</option>
                                {PROJECT_STATUS_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <InputField
                            id="client"
                            label="Cliente"
                            placeholder="Ex: Fatec Taquaritinga"
                            disabled={isLoading}
                            value={client}
                            onChange={(e) => setClient(e.target.value)}
                        />

                        <Select
                            id="partnerId"
                            label="Apoiador"
                            disabled={isLoading}
                            value={partnerId}
                            onChange={(e) => setPartnerId(e.target.value)}
                        >
                            <option value="">Nenhum</option>
                            {partners.map((partner) => (
                                <option key={partner.id} value={partner.id}>
                                    {partner.tradeName}
                                </option>
                            ))}
                        </Select>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                id="startedDate"
                                label="Data de Início *"
                                type="date"
                                disabled={isLoading}
                                value={startedDate}
                                onChange={(e) => setStartedDate(e.target.value)}
                                required
                            />

                            <InputField
                                id="endedDate"
                                label="Data de Término"
                                type="date"
                                disabled={isLoading}
                                value={endedDate}
                                onChange={(e) => setEndedDate(e.target.value)}
                            />
                        </div>

                        <PersonMultiSelect
                            label="Equipe *"
                            options={persons.map((p) => ({ id: p.id, name: p.name }))}
                            selected={memberIds}
                            onChange={setMemberIds}
                            disabled={isLoading}
                        />

                        <div className="flex flex-col gap-2">
                            <label htmlFor="description" className="text-sm text-neutral-950 font-medium font-sans">
                                Descrição *
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                placeholder="Descrição completa do projeto..."
                                disabled={isLoading}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="px-4 py-3 bg-neutral-50 border border-neutral-400 rounded-lg text-sm text-neutral-950 font-sans placeholder:text-neutral-400 resize-none"
                            />
                        </div>

                        <MultiFileInput
                            id="images"
                            label="Imagens"
                            files={imageFiles}
                            onChange={setImageFiles}
                            maxFiles={MAX_IMAGES}
                            disabled={isLoading}
                            hint="Formatos aceitos: PNG, JPG, WEBP"
                            hintRight="Limite máximo: 10"
                        />

                        <Button type="submit" isLoading={isLoading} className="justify-self-end mt-2">
                            <PlusIcon size={24} />
                            {isLoading ? <CircleNotchIcon size={24} className="animate-spin" /> : "ADICIONAR PROJETO"}
                        </Button>
                    </form>
                </div>
            </main>

            <AdminFooter />
        </div>
    );
};
export default CreateProjectPage;
