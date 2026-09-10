"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const usePartners = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [partners, setPartners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const res = await api.get("/partners");
                setPartners(res.data);
                setIsRateLimited(false);
            } catch (error) {
                console.error("Failed to fetch partners", error);
                if (error.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Erro ao carregar os apoiadores");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchPartners();
    }, []);

    return { partners, setPartners, isRateLimited, isLoading };
};

export default usePartners;