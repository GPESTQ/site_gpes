"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import LoadingCard from "@/components/LoadingCard";
import api from "@/lib/axios";
import { paperTypeLabel } from "../../../lib/papersOptions";
import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { buttonStyles } from "@/components/ui/Button";
import PersonCard from "@/components/PersonCard";
import { formatDate } from "@/lib/utils.js";

const PaperDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const redirectTo = "/publicacoes";

    const [paper, setPaper] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRateLimit, setIsRateLimit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchPaper = async () => {
            try {
                const res = await api.get(`/papers/${id}`);
                setPaper(res.data);
                setIsRateLimit(false);
            } catch (error) {
                console.error("Failed to fetch paper", error);
                if (error.response?.status === 429) {
                    setIsRateLimit(true);
                } else if (error.response?.status === 404) {
                    toast.error("Publicação não encontrada");
                    router.push(redirectTo);
                } else {
                    toast.error("Erro ao carregar os dados da publicação");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaper();
    }, [id, router]);

    return (
        <div className="flex flex-col bg-neutral-50 min-h-screen">
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

            <main className="flex-1 pt-24.25 lg:pt-39.5">
                {isLoading && (
                    <PageHeader title="Título da Publicação" breadcrumb="Início / Publicações / Título da Publicação" />
                )}
                {!isLoading && !isRateLimit && paper && (
                    <PageHeader title={paper.title} breadcrumb={`Início / Publicações / ${paper.title}`} smallTitle />
                )}

                <div className="px-4 lg:px-20 py-6">
                    {isLoading && <LoadingCard text="Carregando detalhes da publicação..." />}

                    {!isLoading && !isRateLimit && paper && (
                        <div className="flex flex-col">
                            <span className="font-bold uppercase text-primary-700 font-sans text-sm pb-6">
                                {paperTypeLabel[paper.type]}
                            </span>
                            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                                <div className="flex flex-col gap-6">
                                    <ul className="flex flex-col gap-3">
                                        <li className="pb-6 border-b border-neutral-950 flex flex-col gap-3">
                                            <h2 className="text-3xl font-sans font-bold text-neutral-950">Resumo</h2>
                                            <p className="font-sans text-neutral-950">{paper.abstract}</p>
                                        </li>
                                        <li className="pb-3 border-b border-neutral-950 flex flex-col gap-3">
                                            <p className="font-sans text-neutral-950">
                                                <span className="font-bold">Palavras-chave: </span>
                                                {paper.keywords}
                                            </p>
                                        </li>
                                        <li className="pb-3 border-b border-neutral-950 flex flex-col gap-3">
                                            <p className="font-sans text-neutral-950">
                                                <span className="font-bold">Revista: </span>
                                                {paper.eventJournal}
                                            </p>
                                        </li>
                                        <li className="pb-3 border-b border-neutral-950 flex flex-col gap-3">
                                            <p className="font-sans text-neutral-950">
                                                <span className="font-bold">DOI: </span>
                                                {paper.doi}
                                            </p>
                                        </li>
                                    </ul>
                                    {paper.pdfUrl && (
                                        <a href={paper.pdfUrl} target="blank_" className={buttonStyles}>
                                            <DownloadSimpleIcon size={24} />
                                            BAIXAR PDF
                                        </a>
                                    )}
                                </div>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-3">
                                        <h2 className="text-3xl font-sans font-bold text-neutral-950">Autores</h2>
                                        <div className="flex flex-col">
                                            {[...paper.authors]
                                                .sort((a, b) => a.order - b.order)
                                                .map((author) => (
                                                    <PersonCard key={author.person.id} person={author.person} />
                                                ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 pb-6 border-b border-neutral-950">
                                        <h2 className="text-3xl font-sans font-bold text-neutral-950">Data da Publicação</h2>
                                        <p className="font-sans text-neutral-950">{formatDate(paper.publishedAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PaperDetailsPage;
