"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import api from "@/lib/axios";

const useCreateProject = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [methodology, setMethodology] = useState("");
    const [status, setStatus] = useState("");
    const [client, setClient] = useState("");
    const [partnerId, setPartnerId] = useState("");
    const [startedDate, setStartedDate] = useState("");
    const [endedDate, setEndedDate] = useState("");
    const [memberIds, setMemberIds] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const redirectTo = "/admin/projetos";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !status.trim() || !startedDate || memberIds.length == 0) {
            toast.error("Preencha todos os campos obrigatórios, incluindo ao menos um membro da equipe");
            return;
        }

        setIsLoading(true);
        try {
            let imageUrls = [];

            if (imageFiles.length > 0) {
                const formData = new FormData();
                imageFiles.forEach((file) => formData.append("images", file));
                const uploadRes = await api.post("/upload/project-images", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                imageUrls = uploadRes.data.imageUrls;
            }

            await api.post("/projects", {
                title: title.trim(),
                description: description.trim(),
                methodology: methodology.trim(),
                status,
                client: client.trim(),
                partnerId: partnerId || null,
                startedDate,
                endedDate: endedDate || null,
                memberIds,
                imageUrls,
            });

            toast.success("Projeto adicionado com sucesso!");
            router.push(redirectTo);
        } catch (error) {
            console.error("Failed to create project", error);
            toast.error("Erro ao adicionar projeto");
        } finally {
            setIsLoading(false);
        }
    };

    return {
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
    };
};
export default useCreateProject;
