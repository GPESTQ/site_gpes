"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import LoadingCard from "@/components/LoadingCard";
import api from "@/lib/axios";
import { projectStatusLabel } from "@/lib/projectOptions";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";
import { buttonStyles } from "@/components/ui/Button";
import PersonCard from "@/components/PersonCard";

const ProjectDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const redirectTo = "/publicacoes";

    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRateLimit, setIsRateLimit] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await api.get(`/projects/${id}`);
                setProject(res.data);
                setIsRateLimit(false);
            } catch (error) {
                console.error("Failed to fetch project", error);
                if (error.response?.status === 429) {
                    setIsRateLimit(true);
                } else if (error.response?.status === 404) {
                    toast.error("Projeto não encontrado");
                    router.push(redirectTo);
                } else {
                    toast.error("Erro ao carregar os dados do projeto");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [id, router]);

    return (
        <div className="flex flex-col bg-neutral-50 min-h-screen">
            <Navbar isOpen={isNavbarOpen} setIsOpen={setIsNavbarOpen} />

            <main className="flex-1">
                {isLoading && (
                    <PageHeader title="Título do Projeto" breadcrumb="Início / Projetos / Título do Projeto" />
                )}
                {!isLoading && !isRateLimit && project && (
                    <PageHeader title={project.title} breadcrumb={`Início / Projetos / ${project.title}`} smallTitle />
                )}

                <div className="px-4 lg:px-20 py-6">
                    {isLoading && <LoadingCard text="Carregando detalhes do projeto..." />}

                    {!isLoading && !isRateLimit && project && (
                        <div className="flex flex-col">
                            <span className="font-bold uppercase text-primary-700 font-sans text-sm pb-6">
                                {projectStatusLabel[project.status]}
                            </span>
                            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                                <div className="flex flex-col gap-6">
                                    <ul className="flex flex-col gap-3">
                                        <li className="pb-6 border-b border-neutral-950 flex flex-col gap-3">
                                            <h2 className="text-3xl font-sans font-bold text-neutral-950">Descrição</h2>
                                            <p className="font-sans text-neutral-950">{project.description}</p>
                                        </li>
                                        <li className="pb-3 border-b border-neutral-950 flex flex-col gap-3">
                                            <p className="font-sans text-neutral-950">
                                                <span className="font-bold">Metodologia: </span>
                                                {project.methodology}
                                            </p>
                                        </li>
                                        <li className="pb-3 border-b border-neutral-950 flex flex-col gap-3">
                                            <p className="font-sans text-neutral-950">
                                                <span className="font-bold">Cliente: </span>
                                                {project.client}
                                            </p>
                                        </li>
                                        <li className="pb-3 border-b border-neutral-950 flex flex-col gap-3">
                                            <p className="font-sans text-neutral-950">
                                                <span className="font-bold">Apoiador: </span>
                                                {project.partner.tradeName}
                                            </p>
                                        </li>
                                    </ul>
                                    {project.url && (
                                        <a href={project.url} target="blank_" className={buttonStyles}>
                                            <ArrowSquareOutIcon size={24} />
                                            VISITAR PROJETO
                                        </a>
                                    )}
                                    {project.images.length > 0 && (
                                        <div className="flex-col gap-6 hidden lg:flex">
                                            {[...project.images]
                                                .sort((a, b) => a.order - b.order)
                                                .map((image) => (
                                                    <Image
                                                        key={image.id}
                                                        src={image.url}
                                                        width={840}
                                                        height={440}
                                                        alt={"Imagem do projeto"}
                                                        className="rounded-lg object-cover w-full"
                                                        unoptimized
                                                    />
                                                ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-3">
                                        <h2 className="text-3xl font-sans font-bold text-neutral-950">Integrantes</h2>
                                        <div className="flex flex-col gap-6">
                                            {[...project.members]
                                                .sort((a, b) => a.order - b.order)
                                                .map((member) => (
                                                    <PersonCard key={member.person.id} person={member.person} />
                                                ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 pb-6 border-b border-neutral-950">
                                        <h2 className="text-3xl font-sans font-bold text-neutral-950">
                                            Período de Desenvolvimento
                                        </h2>
                                        <p className="font-sans text-neutral-950">
                                            {project.endedYear && project.endedYear != project.startedYear
                                                ? project.startedYear + " - " + project.endedYear
                                                : project.startedYear}
                                        </p>
                                    </div>
                                </div>
                                {project.images.length > 0 && (
                                    <div className="flex flex-col gap-6 lg:hidden">
                                        {[...project.images]
                                            .sort((a, b) => a.order - b.order)
                                            .map((image) => (
                                                <Image
                                                    key={image.id}
                                                    src={image.url}
                                                    width={840}
                                                    height={440}
                                                    alt={"Imagem do projeto"}
                                                    className="rounded-lg object-cover w-full"
                                                    unoptimized
                                                />
                                            ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProjectDetailsPage;
