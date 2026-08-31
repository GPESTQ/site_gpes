import prisma from "../lib/prisma.js";

export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("PostgreSQL conectado com sucesso (Prisma)");
    } catch (error) {
        console.error("Erro ao conectar com o PostgreSQL", error);
        process.exit(1);
    }
};
