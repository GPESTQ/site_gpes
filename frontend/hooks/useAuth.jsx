"use client"
import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await api.get("/auth/me");
                setAdmin(res.data);
            } catch {
                setAdmin(null);
            } finally {
                setChecking(false);
            }
        };
        checkSession();
    }, []);

    const login = async (email, password) => {
        const res = await api.post("/auth/login", { email, password });
        setAdmin(res.data);
        return res.data;
    };

    const logout = async () => {
        await api.post("/auth/logout");
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, checking, isAuthenticated: !!admin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    return context;
};
