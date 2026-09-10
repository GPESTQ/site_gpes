"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

import api from "@/lib/axios";

const useEditPartner = () => {
    const { id } = useParams();
    const router = useRouter();
    const redirectTo = "/admin/apoiadores";

    const [tradeName, setTradeName] = useState("");
    const [siteUrl, setSiteUrl] = useState("");
    const [logoFile, setLogoFile] = useState(null);
    const [currentLogoUrl, setCurrentLogoUrl] = useState(null);

    const [isFetching, setIsFetching] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPartner = async () => {
            try {
                const res = await api.get(`/partners/${id}`);
                const partner = res.data;

                setTradeName(partner.tradeName || "");
                setSiteUrl(partner.siteUrl || "");
                setCurrentLogoUrl(partner.logoUrl || null);
            } catch (error) {
                console.error("Failed to fetch partner", error);
                toast.error("Erro ao carregar os dados do apoiador");
                router.push(redirectTo);
            } finally {
                setIsFetching(false);
            }
        };

        fetchPartner();
    }, [id, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tradeName.trim()) {
            toast.error("Preencha o nome fantasia");
            return;
        }

        setIsLoading(true);
        try {
            let logoUrl = currentLogoUrl;

            if (logoFile) {
                const formData = new FormData();
                formData.append("photo", logoFile);
                const uploadRes = await api.post("/upload/photo", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                logoUrl = uploadRes.data.imageUrl;
            }

            await api.put(`/partners/${id}`, {
                tradeName: tradeName.trim(),
                siteUrl: siteUrl.trim(),
                logoUrl,
            });

            toast.success("Apoiador atualizado com sucesso!");
            router.push(redirectTo);
        } catch (error) {
            console.error("Failed to update partner", error);
            toast.error("Erro ao atualizar apoiador");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        tradeName,
        setTradeName,
        siteUrl,
        setSiteUrl,
        logoFile,
        setLogoFile,
        currentLogoUrl,
        isFetching,
        isLoading,
        handleSubmit,
    };
};
export default useEditPartner;
