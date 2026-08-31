"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { CircleNotchIcon, FloppyDiskIcon } from "@phosphor-icons/react";

import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import InputField from "@/components/admin/InputField";
import Select from "@/components/admin/Select";
import FileInput from "@/components/admin/FileInput";
import Button from "@/components/ui/Button";
import AdminFooter from "@/components/admin/AdminFooter";
import LoadingCard from "@/components/LoadingCard";
import api from "@/lib/axios";

const EditPersonPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const redirectTo = "/admin/pessoas";

    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [occupation, setOccupation] = useState("");
    const [lattesURL, setLattesURL] = useState("");
    const [linkedinURL, setLinkedinURL] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [currentPhotoUrl, setCurrentPhotoUrl] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const res = await api.get(`/persons/${id}`);
                const person = res.data;

                setName(person.name || "");
                setRole(person.role || "");
                setOccupation(person.occupation || "");
                setLattesURL(person.links?.lattes || "");
                setLinkedinURL(person.links?.linkedin || "");
                setEmail(person.links?.email || "");
                setCurrentPhotoUrl(person.photoUrl || null);
            } catch (error) {
                console.error("Failed to fetch person", error);
                toast.error("Erro ao carregar os dados da pessoa");
                router.push(redirectTo);
            } finally {
                setIsFetching(false);
            }
        };

        fetchPerson();
    }, [id, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !role.trim() || !occupation.trim()) {
            toast.error("Preencha todos os campos obrigatórios");
            return;
        }

        setIsLoading(true);
        try {
            let photoUrl = currentPhotoUrl;

            if (profilePicture) {
                const formData = new FormData();
                formData.append("photo", profilePicture);
                const uploadRes = await api.post("/upload/photo", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                photoUrl = uploadRes.data.imageUrl;
            }

            await api.put(`/persons/${id}`, {
                name: name.trim(),
                role,
                occupation,
                links: {
                    lattes: lattesURL.trim(),
                    linkedin: linkedinURL.trim(),
                    email: email.trim(),
                },
                photoUrl,
            });

            toast.success("Pessoa atualizada com sucesso!");
            router.push(redirectTo);
        } catch (error) {
            console.error("Failed to update person", error);
            toast.error("Erro ao atualizar pessoa");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <AdminNavbar setIsOpen={setIsOpen} />
            <AdminSidebar isOpen={isOpen} actived={"persons"} />

            <main className="pt-20 lg:pl-60 flex-1">
                <AdminPageHeader
                    breadcrumb="Painel de Controle / Pessoas / Editar Pessoa"
                    title="Editar Pessoa"
                    subtitle="Atualize as informações da pessoa selecionada."
                    backLink="/admin/pessoas"
                />

                <div className="px-4 lg:px-6">
                    {isFetching && <LoadingCard text="Carregando dados da pessoa..." />}

                    {!isFetching && (
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="flex justify-center mb-2 lg:order-2">
                                <Image
                                    src={
                                        profilePicture
                                            ? URL.createObjectURL(profilePicture)
                                            : currentPhotoUrl || "/profile-image-placeholder.png"
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
                                    showWarning={true}
                                    warningText="Atenção: caso não selecione uma foto de perfil, será mantida a antiga."
                                    hintRight="Tamanho sugerido: 500x500"
                                    onChange={(e) => {
                                        if (e.target.files?.[0]) setProfilePicture(e.target.files[0]);
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
export default EditPersonPage;
