import prisma from "../lib/prisma.js";

const MAX_IMAGES = 10;

export async function getAllProjects(_, res) {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { startedDate: "desc" },
            include: {
                partner: true,
                members: {
                    orderBy: { order: "asc" },
                    include: { person: { select: { id: true, name: true } } },
                },
                images: { orderBy: { order: "asc" } },
            },
        });
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error in getAllProjects controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getProjectById(req, res) {
    try {
        const project = await prisma.project.findUnique({
            where: { id: req.params.id },
            include: {
                partner: true,
                members: {
                    orderBy: { order: "asc" },
                    include: { person: true },
                },
                images: { orderBy: { order: "asc" } },
            },
        });
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.status(200).json(project);
    } catch (error) {
        console.error("Error in getProjectById controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createProject(req, res) {
    try {
        const {
            title,
            description,
            methodology,
            status,
            client,
            partnerId,
            startedDate,
            endedDate,
            memberIds = [],
            imageUrls = [],
        } = req.body;

        if (imageUrls.length > MAX_IMAGES) {
            return res.status(400).json({ message: `Máximo de ${MAX_IMAGES} imagens por projeto` });
        }

        const newProject = await prisma.project.create({
            data: {
                title,
                description,
                methodology,
                status,
                client,
                partnerId: partnerId || null,
                startedDate: new Date(startedDate),
                endedDate: endedDate ? new Date(endedDate) : null,
                members: {
                    create: memberIds.map((personId, index) => ({ personId, order: index + 1 })),
                },
                images: {
                    create: imageUrls.map((url, index) => ({ url, order: index + 1 })),
                },
            },
            include: {
                partner: true,
                members: { include: { person: true } },
                images: { orderBy: { order: "asc" } },
            },
        });

        res.status(201).json(newProject);
    } catch (error) {
        console.error("Error in createProject controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateProject(req, res) {
    try {
        const {
            title,
            description,
            methodology,
            status,
            client,
            partnerId,
            startedDate,
            endedDate,
            memberIds = [],
            imageUrls = [],
        } = req.body;

        if (imageUrls.length > MAX_IMAGES) {
            return res.status(400).json({ message: `Máximo de ${MAX_IMAGES} imagens por projeto` });
        }

        const updatedProject = await prisma.project.update({
            where: { id: req.params.id },
            data: {
                title,
                description,
                methodology,
                status,
                client,
                partnerId: partnerId || null,
                startedDate: new Date(startedDate),
                endedDate: endedDate ? new Date(endedDate) : null,
                members: {
                    deleteMany: {},
                    create: memberIds.map((personId, index) => ({ personId, order: index + 1 })),
                },
                images: {
                    deleteMany: {},
                    create: imageUrls.map((url, index) => ({ url, order: index + 1 })),
                },
            },
            include: {
                partner: true,
                members: { include: { person: true } },
                images: { orderBy: { order: "asc" } },
            },
        });

        res.status(200).json(updatedProject);
    } catch (error) {
        if (error.code === "P2025") return res.status(404).json({ message: "Project not found" });
        console.error("Error in updateProject controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteProject(req, res) {
    try {
        await prisma.project.delete({ where: { id: req.params.id } });
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        if (error.code === "P2025") return res.status(404).json({ message: "Project not found" });
        console.error("Error in deleteProject controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}