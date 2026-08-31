'use client'
import { InstagramLogoIcon, FacebookLogoIcon } from "@phosphor-icons/react";
import Link from "next/link";
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className="bg-neutral-950 flex-col mt-auto">
            <div className="grid grid-cols-1 gap-6 lg:gap-0 lg:grid-cols-4 px-4 lg:px-20 py-4 lg:py-6 border-b border-b-neutral-500">
                <div className="lg:col-span-2">
                    <Link href="/">
                        <Image src="/logo-gpes.png" alt="Logo do GPES" width={260} height={64} />
                    </Link>
                </div>
                <div className="flex flex-col gap-3 lg:gap-6">
                    <h2 className="text-neutral-50 font-sans font-bold">INFORMAÇÕES DE CONTATO</h2>
                    <p className="text-neutral-50 font-sans text-sm">
                        Fatec Taquaritinga <br />
                        Av. Dr Flávio Henrique Lemos, nº 585 <br />
                        Portal Itamaracá, Taquaritinga – SP <br />
                        15.900-000
                    </p>
                    <span className="text-neutral-50 font-sans text-sm">gpes@fatectq.edu.br</span>
                    <div className="flex gap-6">
                        <a href="https://www.instagram.com/gpes.fatectq" target="_blank">
                            <InstagramLogoIcon className="text-neutral-50 size-8"/>
                        </a>
                        <a href="https://www.facebook.com/gpesoficial/" target="_blank">
                            <FacebookLogoIcon className="text-neutral-50 size-8"/>
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <h2 className="text-neutral-50 font-sans font-bold">LINKS IMPORTANTES</h2>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link href="/papers" className="text-neutral-300 font-sans text-sm hover:text-neutral-50 transition-all duration-300">
                                PUBLICAÇÕES
                            </Link>
                        </li>
                        <li>
                            <Link href="/projects" className="text-neutral-300 font-sans text-sm hover:text-neutral-50 transition-all duration-300">
                                PROJETOS
                            </Link>
                        </li>
                        <li>
                            <Link href="/persons" className="text-neutral-300 font-sans text-sm hover:text-neutral-50 transition-all duration-300">
                                PESSOAS
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="text-neutral-300 font-sans text-sm hover:text-neutral-50 transition-all duration-300">
                                SOBRE NÓS
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex items-center justify-center px-20 py-4">
                <span className="text-neutral-300 font-sans text-sm text-center">
                    Copyright © 2026 GPES – Todos os direitos Reservados
                </span>
            </div>
        </footer>
    );
};
export default Footer;
