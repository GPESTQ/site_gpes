import {
    DesktopIcon,
    HandshakeIcon,
    HouseIcon,
    PackageIcon,
    PaperclipIcon,
    SignOutIcon,
    UsersIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

const AdminSidebar = ({ isOpen, actived }) => {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Sessão encerrada com sucesso");
            router.replace("/admin/login");
        } catch (error) {
            console.error("Failed to logout", error);
            toast.error("Erro ao encerrar sessão");
        }
    };

    return (
        <aside className={`h-[calc(100vh-5rem)] w-60 z-10 lg:block ${isOpen ? "block" : "hidden"} fixed top-20`}>
            <nav className="h-full bg-neutral-950 flex flex-col px-6 py-6">
                <ul className="flex flex-col text-sm font-sans font-medium h-full">
                    <li>
                        <Link
                            href="/admin/pessoas"
                            className={`flex items-center gap-3 px-4 py-2 font-medium rounded-lg transition-all duration-300 ease-in-out ${actived == "home" ? "bg-primary-700 text-neutral-50" : "text-neutral-300 hover:bg-neutral-900 hover:text-neutral-50"}`}
                        >
                            <span className="flex items-center justify-center size-8">
                                <HouseIcon size={24} />
                            </span>
                            <span>Início</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/publicacoes"
                            className={`flex items-center gap-3 px-4 py-2 font-medium rounded-lg transition-all duration-300 ease-in-out ${actived == "papers" ? "bg-primary-700 text-neutral-50" : "text-neutral-300 hover:bg-neutral-900 hover:text-neutral-50"}`}
                        >
                            <span className="flex items-center justify-center size-8">
                                <PaperclipIcon size={24} />
                            </span>
                            <span>Publicações</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/pessoas"
                            className={`flex items-center gap-3 px-4 py-2 font-medium rounded-lg transition-all duration-300 ease-in-out ${actived == "projects" ? "bg-primary-700 text-neutral-50" : "text-neutral-300 hover:bg-neutral-900 hover:text-neutral-50"}`}
                        >
                            <span className="flex items-center justify-center size-8">
                                <PackageIcon size={24} />
                            </span>
                            <span>Projetos</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/pessoas"
                            className={`flex items-center gap-3 px-4 py-2 font-medium rounded-lg transition-all duration-300 ease-in-out ${actived == "persons" ? "bg-primary-700 text-neutral-50" : "text-neutral-300 hover:bg-neutral-900 hover:text-neutral-50"}`}
                        >
                            <span className="flex items-center justify-center size-8">
                                <UsersIcon size={24} />
                            </span>
                            <span>Pessoas</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/pessoas"
                            className={`flex items-center gap-3 px-4 py-2 font-medium rounded-lg transition-all duration-300 ease-in-out ${actived == "affiliates" ? "bg-primary-700 text-neutral-50" : "text-neutral-300 hover:bg-neutral-900 hover:text-neutral-50"}`}
                        >
                            <span className="flex items-center justify-center size-8">
                                <HandshakeIcon size={24} />
                            </span>
                            <span>Apoiadores</span>
                        </Link>
                    </li>
                    <li className="mt-auto">
                        <Link
                            href="/pessoas"
                            className="flex items-center gap-3 px-4 py-2 font-medium rounded-lg transition-all duration-300 ease-in-out text-neutral-300 hover:bg-neutral-900 hover:text-neutral-50"
                        >
                            <span className="flex items-center justify-center size-8">
                                <DesktopIcon size={24} />
                            </span>
                            <span>Acessar o Site</span>
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2 font-medium rounded-lg transition-all duration-300 ease-in-out text-neutral-300 hover:bg-neutral-900 hover:text-neutral-50 w-full cursor-pointer"
                        >
                            <span className="flex items-center justify-center size-8">
                                <SignOutIcon size={24} />
                            </span>
                            <span>Sair</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};
export default AdminSidebar;
