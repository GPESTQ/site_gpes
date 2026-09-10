"use client";
import toast from "react-hot-toast";
import api from "@/lib/axios";

const useDeletePaper = (onDeleted) => {
    const deletePaper = async (id) => {
        if (!window.confirm("Tem certeza que deseja remover essa publicação?")) return;
        try {
            await api.delete(`/papers/${id}`);
            toast.success("Publicação removida com sucesso!");
            onDeleted?.(id);
        } catch (error) {
            console.error("Failed to delete paper", error);
            toast.error("Erro ao remover publicação");
        }
    };

    return { deletePaper };
};
export default useDeletePaper;
