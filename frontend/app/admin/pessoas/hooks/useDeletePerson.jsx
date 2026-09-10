"use client";
import toast from "react-hot-toast";
import api from "@/lib/axios";

const useDeletePerson = (onDeleted) => {
    const deletePerson = async (id) => {
        if (!window.confirm("Tem certeza que deseja remover essa pessoa?")) return;
        try {
            await api.delete(`/persons/${id}`);
            toast.success("Pessoa removida com sucesso!");
            onDeleted?.(id);
        } catch (error) {
            console.error("Failed to delete person", error);
            toast.error("Erro ao remover pessoa");
        }
    };

    return { deletePerson };
};
export default useDeletePerson;
