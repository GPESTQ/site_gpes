import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { AUTH_COOKIE_NAME, AUTH_TOKEN_TTL, AUTH_COOKIE_MAX_AGE_MS } from "../lib/authConstants.js";

function signToken(admin) {
    return jwt.sign({ sub: admin.id }, process.env.JWT_SECRET, { expiresIn: AUTH_TOKEN_TTL });
}

function setAuthCookie(res, token) {
    res.cookie(AUTH_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: AUTH_COOKIE_MAX_AGE_MS,
    });
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Informe e-mail e senha" });
        }

        const admin = await prisma.admin.findUnique({
            where: { email: email.toLowerCase().trim() },
        });

        // Mensagem genérica de propósito — não revela se o e-mail existe ou não
        if (!admin) {
            return res.status(401).json({ message: "E-mail ou senha inválidos" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "E-mail ou senha inválidos" });
        }

        const token = signToken(admin);
        setAuthCookie(res, token);

        res.status(200).json({ id: admin.id, email: admin.email });
    } catch (error) {
        console.error("Error in login controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function logout(_, res) {
    res.clearCookie(AUTH_COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).json({ message: "Logout realizado com sucesso" });
}

export async function me(req, res) {
    // req.admin é definido pelo middleware requireAuth
    res.status(200).json({ id: req.admin.id, email: req.admin.email });
}
