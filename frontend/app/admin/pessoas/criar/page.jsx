"use client";
import { useState } from "react";
import { CircleNotchIcon, PlusIcon } from "@phosphor-icons/react";
import Image from "next/image";

import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import InputField from "@/components/admin/InputField";
import Select from "@/components/admin/Select";
import FileInput from "@/components/admin/FileInput";
import Button from "@/components/ui/Button";
import AdminFooter from "@/components/admin/AdminFooter";
import useCreatePerson from "../hooks/useCreatePerson";

const CreatePersonPage = () => {
    const {
        name, setName,
        role, setRole,
        occupation, setOccupation,
        lattesURL, setLattesURL,
        linkedinURL, setLinkedinURL,
        email, setEmail,
        profilePicture,
        setProfilePicture,
        isLoading,
        handleSubmit,
    } = useCreatePerson();

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <AdminNavbar setIsOpen={setIsNavbarOpen} />
            <AdminSidebar isOpen={isNavbarOpen} actived={"persons"} />

            <main className="pt-20 lg:pl-60 flex-1">
                <AdminPageHeader
                    breadcrumb="Painel de Controle / Pessoas / Adicionar Pessoa"
                    title="Adicionar Pessoa"
                    subtitle="Preencha os dados abaixo para cadastrar uma nova pessoa no grupo."
                    backLink="/admin/pessoas"
                />

                <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-6">
                    <div className="flex justify-center mb-2 lg:order-2">
                        <Image
                            src={
                                profilePicture
                                    ? URL.createObjectURL(profilePicture)
                                    : "/profile-image-placeholder.png"
                            }
                            alt={name || "Foto de perfil"}
                            width={240}
                            height={240}
                            className="rounded-lg object-cover size-60"
                            unoptimized
                        />
                    </div>

                    <form onSubmit={handleSubmit} className="max-w-2xl flex-1 grid gap-y-4">
                        <InputField
                            id="name"
                            label="Nome Completo *"
                            placeholder="Ex: João Miguel Oliveira"
                            disabled={isLoading}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Select
                                id="role"
                                label="Cargo *"
                                disabled={isLoading}
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Selecione uma opção</option>
                                <option value="student">Aluno(a)</option>
                                <option value="alumni">Ex-Aluno(a)</option>
                                <option value="professor">Professor(a)</option>
                                <option value="coordinator">Coordenador(a)</option>
                                <option value="collaborator">Colaborador(a)</option>
                            </Select>

                            <Select
                                id="occupation"
                                label="Descrição *"
                                disabled={isLoading}
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                            >
                                <option value="">Selecione uma opção</option>
                                <option value="researcher">Pesquisador(a)</option>
                                <option value="frontend_developer">Desenvolvedor(a) Front-end</option>
                                <option value="backend_developer">Desenvolvedor(a) Back-end</option>
                                <option value="fullstack_developer">Desenvolvedor(a) Full-stack</option>
                                <option value="software_engineer">Engenheiro(a) de Software</option>
                                <option value="designer">Designer / UX-UI</option>
                            </Select>
                        </div>

                        <InputField
                            id="lattesURL"
                            label="Lattes"
                            placeholder="Ex: http://lattes.cnpq.br/exemplo"
                            disabled={isLoading}
                            value={lattesURL}
                            onChange={(e) => setLattesURL(e.target.value)}
                        />

                        <InputField
                            id="linkedinURL"
                            label="LinkedIn"
                            placeholder="Ex: https://www.linkedin.com/in/exemplo"
                            disabled={isLoading}
                            value={linkedinURL}
                            onChange={(e) => setLinkedinURL(e.target.value)}
                        />

                        <InputField
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="Ex: nome@email.com"
                            disabled={isLoading}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <FileInput
                            id="profilePicture"
                            label="Foto de perfil"
                            accept="image/png, image/jpeg, image/webp"
                            disabled={isLoading}
                            hasFile={!!profilePicture}
                            hintRight="Tamanho sugerido: 500x500"
                            onChange={(e) => {
                                if (e.target.files?.[0]) setProfilePicture(e.target.files[0]);
                            }}
                        />

                        <Button type="submit" isLoading={isLoading} className="justify-self-end mt-2">
                            <PlusIcon size={24} />
                            {isLoading ? <CircleNotchIcon size={24} className="animate-spin" /> : "ADICIONAR PESSOA"}
                        </Button>
                    </form>
                </div>
            </main>

            <AdminFooter />
        </div>
    );
};
export default CreatePersonPage;
