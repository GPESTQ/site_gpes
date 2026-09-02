import axios from "axios";

const BASE_URL = "/api";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isUnauthorized = error.response?.status === 401;
        const url = error.config?.url || "";
        const isAuthCheckOrLogin = url.includes("/auth/login") || url.includes("/auth/me");

        if (isUnauthorized && !isAuthCheckOrLogin && typeof window !== "undefined") {
            window.location.href = "/admin/login";
        }

        return Promise.reject(error);
    }
);

export default api;