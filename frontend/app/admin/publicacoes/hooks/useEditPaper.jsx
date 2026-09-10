"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

import api from "@/lib/axios";

const useEditPaper = () => {
    const { id } = useParams();

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

    const [isFetching, setIsFetching] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const redirectTo = "/admin/publicacoes";

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
                    [...(paper.authors || [])].sort((a, b) => a.order - b.order).map((author) => author.personId),
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

    return {
        title,
        setTitle,
        abstract,
        setAbstract,
        publishedAt,
        setPublishedAt,
        type,
        setType,
        eventJournal,
        setEventJournal,
        keywords,
        setKeywords,
        doi,
        setDoi,
        setPdfFile,
        authorIds,
        setAuthorIds,
        isFetching,
        isLoading,
        handleSubmit,
    };
};
export default useEditPaper;
