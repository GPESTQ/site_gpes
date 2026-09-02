"use client"
import Link from "next/link";
import Image from "next/image";
import { ListIcon } from "@phosphor-icons/react";

const Navbar = ({ isOpen, setIsOpen }) => {
    return (
        <nav className="bg-neutral-950 flex flex-col fixed w-screen z-10">
            <div className="flex items-center gap-4 lg:gap-0 lg:justify-center px-4 lg:px-20 py-6 w-full border-b border-neutral-500">
                <input
                    id="sidebar"
                    type="checkbox"
                    className="hidden"
                    onChange={(e) => {
                        setIsOpen(e.target.checked);
                    }}
                />
                <label
                    htmlFor="sidebar"
                    className="lg:hidden size-10 flex items-center justify-center rounded-full text-neutral-300 hover:bg-neutral-900 hover:text-neutral-50 cursor-pointer"
                >
                    <ListIcon size={24} />
                </label>
                <Link href="/pessoas">
                    <Image src="/logo-gpes.png" alt="Logo do GPES" width={260} height={64} className="w-48 h-12 lg:w-65 lg:h-16" priority />
                </Link>
            </div>
            <div className={`flex flex-col lg:flex-row items-center justify-center gap-8 px-6 lg:px-20 py-6 lg:py-3 border-b border-neutral-500 lg:flex ${isOpen ? "flex" : "hidden"}`}>
                <Link
                    href="/publicacoes"
                    className="text-neutral-300 font-sans font-medium text-sm hover:text-neutral-50 transition-all duration-300 ease-in-out"
                >
                    PUBLICAÇÕES
                </Link>
                <Link
                    href="/pessoas"
                    className="text-neutral-300 font-sans font-medium text-sm hover:text-neutral-50 transition-all duration-300 ease-in-out"
                >
                    PROJETOS
                </Link>
                <Link
                    href="/pessoas"
                    className="text-neutral-300 font-sans font-medium text-sm hover:text-neutral-50 transition-all duration-300 ease-in-out"
                >
                    PESSOAS
                </Link>
                <Link
                    href="/pessoas"
                    className="text-neutral-300 font-sans font-medium text-sm hover:text-neutral-50 transition-all duration-300 ease-in-out"
                >
                    SOBRE NÓS
                </Link>
            </div>
        </nav>
    );
};
export default Navbar;
