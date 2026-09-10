"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

import api from "@/lib/axios";

const useEditPerson = () => {
    const { id } = useParams();

    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [occupation, setOccupation] = useState("");
    const [lattesURL, setLattesURL] = useState("");
    const [linkedinURL, setLinkedinURL] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [currentPhotoUrl, setCurrentPhotoUrl] = useState("");

    const router = useRouter();
    const redirectTo = "/admin/pessoas";

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const res = await api.get(`/persons/${id}`);
                const person = res.data;

                setName(person.name || "");
                setRole(person.role || "");
                setOccupation(person.occupation || "");
                setLattesURL(person.links?.lattes || "");
                setLinkedinURL(person.links?.linkedin || "");
                setEmail(person.links?.email || "");
                setCurrentPhotoUrl(person.photoUrl || null);
            } catch (error) {
                console.error("Failed to fetch person", error);
                toast.error("Erro ao carregar os dados da pessoa");
                router.push(redirectTo);
            } finally {
                setIsFetching(false);
            }
        };

        fetchPerson();
    }, [id, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !role.trim() || !occupation.trim()) {
            toast.error("Preencha todos os campos obrigatórios");
            return;
        }

        setIsLoading(true);
        try {
            let photoUrl = currentPhotoUrl;

            if (profilePicture) {
                const formData = new FormData();
                formData.append("photo", profilePicture);
                const uploadRes = await api.post("/upload/photo", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                photoUrl = uploadRes.data.imageUrl;
            }

            await api.put(`/persons/${id}`, {
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

            toast.success("Pessoa atualizada com sucesso!");
            router.push(redirectTo);
        } catch (error) {
            console.error("Failed to update person", error);
            toast.error("Erro ao atualizar pessoa");
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
        currentPhotoUrl,
        isLoading,
        isFetching,
        handleSubmit
    };
};

export default useEditPerson;