import prisma from "../lib/prisma.js";

export async function getAllPapers(_, res) {
    try {
        const papers = await prisma.paper.findMany({
            orderBy: { publishedAt: "desc" },
            include: {
                authors: {
                    orderBy: { order: "asc" },
                    include: { person: { select: { id: true, name: true } } },
                },
            },
        });
        res.status(200).json(papers);
    } catch (error) {
        console.error("Error in getAllPapers controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getPaperById(req, res) {
    try {
        const paper = await prisma.paper.findUnique({
            where: { id: req.params.id },
            include: {
                authors: {
                    orderBy: { order: "asc" },
                    include: { person: { select: { id: true, name: true } } },
                },
            },
        });
        if (!paper) return res.status(404).json({ message: "Paper not found" });
        res.status(200).json(paper);
    } catch (error) {
        console.error("Error in getPaperById controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createPaper(req, res) {
    try {
        const { title, abstract, publishedAt, type, eventJournal, keywords, doi, pdfUrl, authorIds } = req.body;

        const newPaper = await prisma.paper.create({
            data: {
                title,
                abstract,
                publishedAt: new Date(publishedAt),
                type,
                eventJournal,
                keywords,
                doi,
                pdfUrl,
                authors: {
                    create: authorIds.map((personId, index) => ({
                        personId,
                        order: index + 1,
                    })),
                },
            },
            include: {
                authors: { include: { person: true } },
            },
        });

        res.status(201).json(newPaper);
    } catch (error) {
        console.error("Error in createPaper controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updatePaper(req, res) {
    try {
        const { title, abstract, publishedAt, type, eventJournal, keywords, doi, pdfUrl, authorIds } = req.body;

        const updatedPaper = await prisma.paper.update({
            where: { id: req.params.id },
            data: {
                title,
                abstract,
                publishedAt: new Date(publishedAt),
                type,
                eventJournal,
                keywords,
                doi,
                pdfUrl,
                authors: {
                    deleteMany: {},
                    create: authorIds.map((personId, index) => ({
                        personId,
                        order: index + 1,
                    })),
                },
            },
            include: {
                authors: { include: { person: true } },
            },
        });

        res.status(200).json(updatedPaper);
    } catch (error) {
        if (error.code === "P2025") return res.status(404).json({ message: "Paper not found" });
        console.error("Error in updatePaper controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deletePaper(req, res) {
    try {
        await prisma.paper.delete({ where: { id: req.params.id } });
        res.status(200).json({ message: "Paper deleted successfully" });
    } catch (error) {
        if (error.code === "P2025") return res.status(404).json({ message: "Paper not found" });
        console.error("Error in deletePaper controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
