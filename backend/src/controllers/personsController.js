import prisma from "../lib/prisma.js";

export async function getAllPersons(_, res) {
    try {
        const persons = await prisma.person.findMany({ orderBy: { name: "asc" } });
        res.status(200).json(persons);
    } catch (error) {
        console.error("Error in getAllPersons controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getPersonById(req, res) {
    try {
        const person = await prisma.person.findUnique({ where: { id: req.params.id } });
        if (!person) return res.status(404).json({ message: "Person not found" });
        res.status(200).json(person);
    } catch (error) {
        console.error("Error in getPersonById controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createPerson(req, res) {
    try {
        const { name, photoUrl, role, occupation, links } = req.body;
        const newPerson = await prisma.person.create({
            data: { name, photoUrl, role, occupation, links },
        });
        res.status(201).json(newPerson);
    } catch (error) {
        console.error("Error in createPerson controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updatePerson(req, res) {
    try {
        const { name, photoUrl, role, occupation, links } = req.body;
        const updatedPerson = await prisma.person.update({
            where: { id: req.params.id },
            data: { name, photoUrl, role, occupation, links },
        });
        res.status(200).json(updatedPerson);
    } catch (error) {
        if (error.code === "P2025") return res.status(404).json({ message: "Person not found" });
        console.error("Error in updatePerson controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deletePerson(req, res) {
    try {
        await prisma.person.delete({ where: { id: req.params.id } });
        res.status(200).json({ message: "Person deleted successfully" });
    } catch (error) {
        if (error.code === "P2025") return res.status(404).json({ message: "Person not found" });
        console.error("Error in deletePerson controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
