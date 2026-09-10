"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import api from "@/lib/axios";

const useCreatePartner = () => {
    const [tradeName, setTradeName] = useState("");
    const [siteUrl, setSiteUrl] = useState("");
    const [logoFile, setLogoFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const redirectTo = "/admin/apoiadores";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tradeName.trim()) {
            toast.error("Preencha o nome fantasia");
            return;
        }

        setIsLoading(true);
        try {
            let logoUrl = null;

            if (logoFile) {
                const formData = new FormData();
                formData.append("photo", logoFile);
                const uploadRes = await api.post("/upload/photo", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                logoUrl = uploadRes.data.imageUrl;
            }

            await api.post("/partners", {
                tradeName: tradeName.trim(),
                siteUrl: siteUrl.trim(),
                logoUrl,
            });

            toast.success("Apoiador adicionado com sucesso!");
            router.push(redirectTo);
        } catch (error) {
            console.error("Failed to create partner", error);
            toast.error("Erro ao adicionar apoiador");
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
        isLoading,
        handleSubmit,
    };
};
export default useCreatePartner;
