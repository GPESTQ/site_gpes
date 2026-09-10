import prisma from "../lib/prisma.js";

export async function getAllPartners(_, res) {
    try {
        const partners = await prisma.partner.findMany({ orderBy: { tradeName: "asc" } });
        res.status(200).json(partners);
    } catch (error) {
        console.error("Error in getAllPartners controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getPartnerById(req, res) {
    try {
        const partner = await prisma.partner.findUnique({ where: { id: req.params.id } });
        if (!partner) return res.status(404).json({ message: "Partner not found" });
        res.status(200).json(partner);
    } catch (error) {
        console.error("Error in getPartnerById controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createPartner(req, res) {
    try {
        const { tradeName, logoUrl, siteUrl } = req.body;
        const newPartner = await prisma.partner.create({
            data: { tradeName, logoUrl, siteUrl },
        });
        res.status(201).json(newPartner);
    } catch (error) {
        console.error("Error in createPartner controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updatePartner(req, res) {
    try {
        const { tradeName, logoUrl, siteUrl } = req.body;
        const updatedPartner = await prisma.partner.update({
            where: { id: req.params.id },
            data: { tradeName, logoUrl, siteUrl },
        });
        res.status(200).json(updatedPartner);
    } catch (error) {
        if (error.code === "P2025") return res.status(404).json({ message: "Partner not found" });
        console.error("Error in updatePartner controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deletePartner(req, res) {
    try {
        await prisma.partner.delete({ where: { id: req.params.id } });
        res.status(200).json({ message: "Partner deleted successfully" });
    } catch (error) {
        if (error.code === "P2025") return res.status(404).json({ message: "Partner not found" });
        console.error("Error in deletePartner controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
