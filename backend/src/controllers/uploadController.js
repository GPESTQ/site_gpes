import prisma from "../lib/prisma.js";

export const uploadPersonPhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const photoUrl = req.file.path;
        const person = await prisma.person.update({
            where: { id },
            data: { photoUrl },
        });
        res.status(200).json(person);
    } catch (error) {
        if (error.code === "P2025") return res.status(404).json({ message: "Person not found" });
        console.error("Error in uploadPersonPhoto controller", error);
        res.status(500).json({ message: error.message });
    }
};

export const uploadPaperPdf = async (req, res) => {
    try {
        const { id } = req.params;
        const pdfUrl = req.file.path;
        const paper = await prisma.paper.update({
            where: { id },
            data: { pdfUrl },
        });
        res.status(200).json(paper);
    } catch (error) {
        if (error.code === "P2025") return res.status(404).json({ message: "Paper not found" });
        console.error("Error in uploadPaperPdf controller", error);
        res.status(500).json({ message: error.message });
    }
};
