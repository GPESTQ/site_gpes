"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const usePersons = (id = null) => {
    const [persons, setPersons] = useState([]);
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [trigger, setTrigger] = useState(0);
    const [filter, setFilter] = useState("all");

    const refetch = () => setTrigger(t => t + 1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = id ? `/persons/${id}` : "/persons";
                const res = await api.get(url);
                id ? setPerson(res.data) : setPersons(res.data);
                setIsRateLimited(false);
            } catch (error) {
                if (error.response?.status === 429) setIsRateLimited(true);
                else toast.error("Falha ao carregar pessoas");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, trigger]);

    const filteredPersons = filter === "all"
        ? persons
        : persons.filter((p) => p.role === filter);

    return { filteredPersons, person, loading, isRateLimited, filter, setFilter, refetch };
};

export default usePersons;