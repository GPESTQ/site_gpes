"use client";
import { useState } from "react";
import { CircleNotchIcon, FloppyDiskIcon } from "@phosphor-icons/react";

import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import InputField from "@/components/admin/InputField";
import Select from "@/components/admin/Select";
import PersonMultiSelect from "@/components/admin/PersonMultiSelect";
import MultiFileInput from "@/components/admin/MultiFileInput";
import Button from "@/components/ui/Button";
import AdminFooter from "@/components/admin/AdminFooter";
import LoadingCard from "@/components/LoadingCard";
import usePersons from "@/hooks/usePersons";
import usePartners from "@/hooks/usePartners";
import { PROJECT_STATUS_OPTIONS } from "@/lib/projectOptions";
import useEditProject from "../hooks/useEditProject";

const MAX_IMAGES = 10;

const EditProjectPage = () => {
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
        existingImageUrls,
        isFetching,
        isLoading,
        removeExistingImage,
        handleSubmit,
    } = useEditProject();

    const { persons } = usePersons();
    const { partners } = usePartners();
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <AdminNavbar setIsOpen={setIsNavbarOpen} />
            <AdminSidebar isOpen={isNavbarOpen} actived={"projects"} />

            <main className="pt-20 lg:pl-60 flex-1">
                <AdminPageHeader
                    breadcrumb="Painel de Controle / Projetos / Editar Projeto"
                    title="Editar Projeto"
                    subtitle="Atualize as informações do projeto selecionado."
                    backLink="/admin/projetos"
                />

                <div className="px-4 lg:px-6">
                    {isFetching && <LoadingCard text="Carregando dados do projeto..." />}

                    {!isFetching && persons.length > 0 && (
                        <form onSubmit={handleSubmit} className="max-w-2xl grid gap-y-4">
                            <InputField
                                id="title"
                                label="Título *"
                                disabled={isLoading}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />

                            <div className="flex flex-col gap-2">
                                <label htmlFor="description" className="text-sm text-neutral-950 font-medium font-sans">
                                    Descrição *
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    disabled={isLoading}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="px-4 py-3 bg-neutral-50 border border-neutral-400 rounded-lg text-sm text-neutral-950 font-sans placeholder:text-neutral-400 resize-none"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="methodology" className="text-sm text-neutral-950 font-medium font-sans">
                                    Metodologia
                                </label>
                                <textarea
                                    id="methodology"
                                    rows={3}
                                    disabled={isLoading}
                                    value={methodology}
                                    onChange={(e) => setMethodology(e.target.value)}
                                    className="px-4 py-3 bg-neutral-50 border border-neutral-400 rounded-lg text-sm text-neutral-950 font-sans placeholder:text-neutral-400 resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                                <InputField
                                    id="client"
                                    label="Cliente"
                                    disabled={isLoading}
                                    value={client}
                                    onChange={(e) => setClient(e.target.value)}
                                />
                            </div>

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
                                label="Equipe"
                                options={persons.map((p) => ({ id: p.id, name: p.name }))}
                                selected={memberIds}
                                onChange={setMemberIds}
                                disabled={isLoading}
                            />

                            <MultiFileInput
                                id="images"
                                label="Imagens do Projeto"
                                files={imageFiles}
                                onChange={setImageFiles}
                                existingUrls={existingImageUrls}
                                onRemoveExisting={removeExistingImage}
                                maxFiles={MAX_IMAGES}
                                disabled={isLoading}
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
                    )}
                </div>
            </main>

            <AdminFooter />
        </div>
    );
};
export default EditProjectPage;