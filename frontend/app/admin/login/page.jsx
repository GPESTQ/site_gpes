"use client";
import { CircleNotchIcon, EyeClosedIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth.jsx";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import InputField from "@/components/admin/InputField";
import Button from "@/components/ui/Button";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const redirectTo = "/admin/pessoas";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            toast.error("Preencha e-mail e senha");
            return;
        }

        setLoading(true);
        try {
            await login(email.trim(), password);
            router.replace(redirectTo);
        } catch (error) {
            const message = error.response?.data?.message || "Erro ao fazer login";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950">
            <div onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Image src="/logo-gpes.png" alt="Logo do GPES" width={320} height={80} />
                <InputField
                    id="email"
                    label="E-mail"
                    type="text"
                    placeholder="Informe seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-96"
                    labelClassName="text-neutral-50"
                />

                <InputField
                    id="senha"
                    label="Senha"
                    type="password"
                    placeholder="Informe sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-96"
                    labelClassName="text-neutral-50"
                />

                <Button isLoading={loading} className="justify-center w-full" onClick={handleSubmit}>
                    {loading ? <CircleNotchIcon size={24} className="animate-spin" /> : "ACESSAR"}
                </Button>
            </div>
        </div>
    );
};
export default LoginPage;
