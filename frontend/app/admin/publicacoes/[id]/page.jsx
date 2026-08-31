"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CircleNotchIcon, FloppyDiskIcon } from "@phosphor-icons/react";

import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import InputField from "@/components/admin/InputField";
import Select from "@/components/admin/Select";
import FileInput from "@/components/admin/FileInput";
import AuthorMultiSelect from "@/components/admin/AuthorMultiSelect";
import Button from "@/components/ui/Button";
import AdminFooter from "@/components/admin/AdminFooter";
import LoadingCard from "@/components/LoadingCard";
import api from "@/lib/axios";
import usePersons from "@/hooks/usePersons";

const EditPaperPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const redirectTo = "/admin/publicacoes";

    const [title, setTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    const [publishedAt, setPublishedAt] = useState("");
    const [type, setType] = useState("");
    const [eventJournal, setEventJournal] = useState("");
    const [keywords, setKeywords] = useState("");
    const [doi, setDoi] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [currentPdfUrl, setCurrentPdfUrl] = useState(null);
    const [authorIds, setAuthorIds] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const { filteredPersons: persons } = usePersons();

    useEffect(() => {
        const fetchPaper = async () => {
            try {
                const res = await api.get(`/papers/${id}`);
                const paper = res.data;

                setTitle(paper.title || "");
                setAbstract(paper.abstract || "");
                setPublishedAt(paper.publishedAt ? paper.publishedAt.slice(0, 10) : "");
                setType(paper.type || "");
                setEventJournal(paper.eventJournal || "");
                setKeywords(paper.keywords || "");
                setDoi(paper.doi || "");
                setCurrentPdfUrl(paper.pdfUrl || null);
                setAuthorIds(
                    [...(paper.authors || [])]
                        .sort((a, b) => a.order - b.order)
                        .map((author) => author.personId)
                );
                console.log("paper.authors (bruto):", paper.authors);
                console.log("authorIds calculado:", authorIds);
            } catch (error) {
                console.error("Failed to fetch paper", error);
                toast.error("Erro ao carregar os dados da publicação");
                router.push(redirectTo);
            } finally {
                setIsFetching(false);
            }
        };

        fetchPaper();
    }, [id, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !title.trim() ||
            !abstract.trim() ||
            !eventJournal.trim() ||
            !keywords.trim() ||
            !doi.trim() ||
            !type.trim() ||
            !publishedAt ||
            authorIds.length === 0
        ) {
            toast.error("Preencha todos os campos obrigatórios, incluindo ao menos um autor");
            return;
        }

        setIsLoading(true);
        try {
            let pdfUrl = currentPdfUrl;

            if (pdfFile) {
                const formData = new FormData();
                formData.append("pdf", pdfFile);
                const uploadRes = await api.post("/upload/pdf", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                pdfUrl = uploadRes.data.imageUrl;
            }

            await api.put(`/papers/${id}`, {
                title: title.trim(),
                abstract: abstract.trim(),
                publishedAt,
                type,
                eventJournal: eventJournal.trim(),
                keywords: keywords.trim(),
                doi: doi.trim(),
                pdfUrl,
                authorIds,
            });

            toast.success("Publicação atualizada com sucesso!");
            router.push(redirectTo);
        } catch (error) {
            console.error("Failed to update paper", error);
            toast.error("Erro ao atualizar publicação");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <AdminNavbar setIsOpen={setIsOpen} />
            <AdminSidebar isOpen={isOpen} actived={"papers"} />

            <main className="pt-20 lg:pl-60 flex-1">
                <AdminPageHeader
                    breadcrumb="Painel de Controle / Publicações / Editar Publicação"
                    title="Editar Publicação"
                    subtitle="Atualize as informações da publicação selecionada."
                    backLink="/admin/publicacoes"
                />

                <div className="max-w-2xl px-4 lg:px-6">
                    {isFetching && <LoadingCard text="Carregando dados da publicação..." />}

                    {!isFetching && persons.length > 0 && (
                        <form onSubmit={handleSubmit} className="grid gap-y-4">
                            <InputField
                                id="title"
                                label="Título *"
                                placeholder="Ex: Utilização de IA Generativa na Educação de Crianças com TEA"
                                disabled={isLoading}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    id="publishedAt"
                                    label="Data de Publicação *"
                                    type="date"
                                    disabled={isLoading}
                                    value={publishedAt}
                                    onChange={(e) => setPublishedAt(e.target.value)}
                                    required
                                />

                                <Select
                                    id="type"
                                    label="Tipo *"
                                    disabled={isLoading}
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="">Selecione uma opção</option>
                                    <option value="article">Artigo Científico</option>
                                    <option value="proceedings">Anais de Evento</option>
                                </Select>
                            </div>

                            <InputField
                                id="keywords"
                                label="Palavras-chave *"
                                placeholder="Ex: IA Generativa. TEA. Educação."
                                disabled={isLoading}
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                            />

                            <InputField
                                id="doi"
                                label="DOI *"
                                placeholder="Ex: https://doi.org/exemplo"
                                disabled={isLoading}
                                value={doi}
                                onChange={(e) => setDoi(e.target.value)}
                            />

                            <InputField
                                id="eventJournal"
                                label="Evento / Revista *"
                                placeholder="Ex: Congresso Brasileiro de Engenharia de Software"
                                disabled={isLoading}
                                value={eventJournal}
                                onChange={(e) => setEventJournal(e.target.value)}
                            />

                            <AuthorMultiSelect
                                label="Autores *"
                                options={persons.map((p) => ({ id: p.id, name: p.name }))}
                                selected={authorIds}
                                onChange={setAuthorIds}
                                disabled={isLoading}
                            />

                            <div className="flex flex-col gap-2">
                                <label htmlFor="abstract" className="text-sm text-neutral-950 font-medium font-sans">
                                    Resumo *
                                </label>
                                <textarea
                                    id="abstract"
                                    rows={4}
                                    placeholder="Resumo da publicação..."
                                    disabled={isLoading}
                                    value={abstract}
                                    onChange={(e) => setAbstract(e.target.value)}
                                    className="px-4 py-3 bg-neutral-50 border border-neutral-400 rounded-lg text-sm text-neutral-950 font-sans placeholder:text-neutral-400 resize-none"
                                />
                            </div>

                            <FileInput
                                id="pdfFile"
                                label="PDF da publicação"
                                accept="application/pdf"
                                hint="Formatos aceitos: PDF"
                                disabled={isLoading}
                                showWarning={true}
                                warningText="Atenção: caso não selecione um novo PDF, será mantido o arquivo atual."
                                onChange={(e) => {
                                    if (e.target.files?.[0]) setPdfFile(e.target.files[0]);
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
                    )}
                </div>
            </main>

            <AdminFooter />
        </div>
    );
};
export default EditPaperPage;