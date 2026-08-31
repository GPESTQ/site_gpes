import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { AUTH_COOKIE_NAME } from "../lib/authConstants.js";

export async function requireAuth(req, res, next) {
    try {
        const token = req.cookies?.[AUTH_COOKIE_NAME];
        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await prisma.admin.findUnique({ where: { id: payload.sub } });

        if (!admin) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        req.admin = admin;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired session" });
    }
}

export default requireAuth;