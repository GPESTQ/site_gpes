"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const usePapers = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [papers, setPapers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const res = await api.get("/papers");
                setPapers(res.data);
                setIsRateLimited(false);
            } catch (error) {
                console.error("Failed to fetch papers", error);
                if (error.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Erro ao carregar as publicações");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchPapers();
    }, []);

  return { papers, setPapers, isRateLimited, isLoading };
}
export default usePapers