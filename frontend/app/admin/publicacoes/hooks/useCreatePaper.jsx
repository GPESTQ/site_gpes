"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import api from "@/lib/axios";

const useCreatePaper = () => {
    const [title, setTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    const [publishedAt, setPublishedAt] = useState("");
    const [type, setType] = useState("");
    const [eventJournal, setEventJournal] = useState("");
    const [keywords, setKeywords] = useState("");
    const [doi, setDoi] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [authorIds, setAuthorIds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const redirectTo = "/admin/publicacoes";

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
            let pdfUrl = null;

            if (pdfFile) {
                const formData = new FormData();
                formData.append("pdf", pdfFile);
                const uploadRes = await api.post("/upload/pdf", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                pdfUrl = uploadRes.data.imageUrl;
            }

            await api.post("/papers", {
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

            toast.success("Publicação adicionada com sucesso!");
            router.push(redirectTo);
        } catch (error) {
            console.error("Failed to create paper", error);
            toast.error("Erro ao adicionar publicação");
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
        isLoading,
		handleSubmit
    };
};
export default useCreatePaper;
