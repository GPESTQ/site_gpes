"use client";
import toast from "react-hot-toast";
import api from "@/lib/axios";

const useDeleteProject = (onDeleted) => {
  const deleteProject = async (id) => {
        if (!window.confirm("Tem certeza que deseja remover esse projeto?")) return;
        try {
            await api.delete(`/projects/${id}`);
            toast.success("Projeto removido com sucesso!");
            onDeleted?.(id);
        } catch (error) {
            console.error("Failed to delete project", error);
            toast.error("Erro ao remover projeto");
        }
    };

    return { deleteProject };
}
export default useDeleteProject