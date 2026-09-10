"use client";
import toast from "react-hot-toast";
import api from "@/lib/axios";

const useDeletePartner = (onDeleted) => {
    const deletePartner = async (id) => {
        if (!window.confirm("Tem certeza que deseja remover esse apoiador?")) return;
        try {
            await api.delete(`/partners/${id}`);
            toast.success("Apoiador removido com sucesso!");
            onDeleted?.(id);
        } catch (error) {
            console.error("Failed to delete partner", error);
            toast.error("Erro ao remover apoiador");
        }
    };

    return { deletePartner };
};
export default useDeletePartner;
