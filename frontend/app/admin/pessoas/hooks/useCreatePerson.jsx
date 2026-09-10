"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import api from "@/lib/axios";

const useCreatePerson = () => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [occupation, setOccupation] = useState("");
    const [lattesURL, setLattesURL] = useState("");
    const [linkedinURL, setLinkedinURL] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const redirectTo = "/admin/pessoas";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !role.trim() || !occupation.trim()) {
            toast.error("Preencha todos os campos obrigatórios");
            return;
        }

        setIsLoading(true);
        try {
            let photoUrl = null;

            if (profilePicture) {
                const formData = new FormData();
                formData.append("photo", profilePicture);
                const uploadRes = await api.post("/upload/photo", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                photoUrl = uploadRes.data.imageUrl;
            }

            await api.post("/persons", {
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

            toast.success("Pessoa adicionada com sucesso!");
            router.push(redirectTo);
        } catch (error) {
            console.error("Failed to create person", error);
            toast.error("Erro ao adicionar pessoa");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        name, setName,
        role, setRole,
        occupation, setOccupation,
        lattesURL, setLattesURL,
        linkedinURL, setLinkedinURL,
        email, setEmail,
        profilePicture, setProfilePicture,
        isLoading,
        handleSubmit
    };
};

export default useCreatePerson;