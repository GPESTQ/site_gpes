"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

import api from "@/lib/axios";

const useEditProject = () => {
    const { id } = useParams();

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
    const [existingImageUrls, setExistingImageUrls] = useState([]);

    const [isFetching, setIsFetching] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const redirectTo = "/admin/projetos";

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await api.get(`/projects/${id}`);
                const project = res.data;

                setTitle(project.title || "");
                setDescription(project.description || "");
                setMethodology(project.methodology || "");
                setStatus(project.status || "");
                setClient(project.client || "");
                setPartnerId(project.partnerId || "");
                setStartedDate(project.startedDate ? project.startedDate.slice(0, 10) : "");
                setEndedDate(project.endedDate ? project.endedDate.slice(0, 10) : "");
                setMemberIds(
                    [...(project.members || [])].sort((a, b) => a.order - b.order).map((member) => member.personId),
                );
                setExistingImageUrls((project.images || []).map((image) => image.url));
            } catch (error) {
                console.error("Failed to fetch project", error);
                toast.error("Erro ao carregar os dados do projeto");
                router.push(redirectTo);
            } finally {
                setIsFetching(false);
            }
        };

        fetchProject();
    }, [id, router]);

    const removeExistingImage = (url) => {
        setExistingImageUrls((prev) => prev.filter((existingUrl) => existingUrl !== url));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !status.trim() || !startedDate) {
            toast.error("Preencha todos os campos obrigatórios");
            return;
        }

        setIsLoading(true);
        try {
            let newImageUrls = [];

            if (imageFiles.length > 0) {
                const formData = new FormData();
                imageFiles.forEach((file) => formData.append("images", file));
                const uploadRes = await api.post("/upload/project-images", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                newImageUrls = uploadRes.data.imageUrls;
            }

            // Como o backend substitui todas as imagens a cada atualização,
            // reenviamos as que devem continuar + as novas recém-enviadas.
            const imageUrls = [...existingImageUrls, ...newImageUrls];

            await api.put(`/projects/${id}`, {
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

            toast.success("Projeto atualizado com sucesso!");
            router.push(redirectTo);
        } catch (error) {
            console.error("Failed to update project", error);
            toast.error("Erro ao atualizar projeto");
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
        existingImageUrls,
        isFetching,
        isLoading,
        removeExistingImage,
        handleSubmit,
    };
};
export default useEditProject;
