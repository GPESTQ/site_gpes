"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const useProjects = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get("/projects");
                setProjects(res.data);
                setIsRateLimited(false);
            } catch (error) {
                console.error("Failed to fetch projects", error);
                if (error.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Erro ao carregar os projetos");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return { projects, setProjects, isRateLimited, isLoading };
};
export default useProjects;
