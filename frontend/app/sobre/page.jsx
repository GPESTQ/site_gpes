"use client";
import { useState } from "react";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "../../components/PageHeader";

const PersonsPage = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    return (
        <div className="flex flex-col bg-neutral-50 min-h-screen">
            <Navbar isOpen={isNavbarOpen} setIsOpen={setIsNavbarOpen} />

            <main className="flex-1">
                <PageHeader
                    title="Sobre Nós"
                    subtitle="Conheça a história, a missão e as linhas de pesquisa do GPES."
                    breadcrumb="Início / Sobre Nós"
                />

                <div className="px-4 lg:px-20 flex flex-col">
                    <div className="flex flex-col lg:flex-row gap-6 py-6 border-b border-be-neutral-950">
                        <div className="flex-1 flex flex-col gap-3">
                            <span className="font-bold uppercase text-primary-700 font-sans text-sm">
                                CONHEÇA O GPES
                            </span>
                            <h2 className="font-display text-4xl font-black text-neutral-950">Sobre o grupo</h2>
                            <p className="text-neutral-950 font-sans">
                                O Grupo de Pesquisa em Engenharia de Software (GPES) foi fundado em 2011 na Fatec
                                Taquaritinga, sob coordenação da Profa. Dra. Daniela Gibertoni. Ao longo dos anos, o
                                grupo se consolidou como um espaço de investigação científica e desenvolvimento prático,
                                reunindo professores, alunos e ex-alunos dedicados a transformar pesquisa acadêmica em
                                soluções tecnológicas com impacto real.
                            </p>
                        </div>

                        <Image
                            src="/group.jpg"
                            alt="Foto do grupo"
                            width={1200}
                            height={960}
                            className="rounded-lg object-top object-cover w-180 lg:h-120"
                            unoptimized
                        />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 py-6 border-b border-be-neutral-950">
                        <div className="flex-1 flex flex-col gap-3 lg:order-2">
                            <span className="font-bold uppercase text-primary-700 font-sans text-sm">
                                CONHEÇA O GPES
                            </span>
                            <h2 className="font-display text-4xl font-black text-neutral-950">O que pesquisamos</h2>
                            <p className="text-neutral-950 font-sans">
                                Nossas pesquisas se concentram em duas grandes áreas: Interação Humano-Computador (IHC)
                                e metodologias de desenvolvimento de software. Investigamos como tornar sistemas mais
                                acessíveis, intuitivos e inclusivos, com atenção especial a públicos com necessidades
                                específicas — como demonstram projetos como o Vidaut e o Autoconnect, voltados a
                                crianças com Transtorno do Espectro Autista (TEA). Essas investigações resultam em
                                artigos científicos, apresentações em eventos e parcerias com a comunidade acadêmica
                                nacional e internacional.
                            </p>
                        </div>

                        <Image
                            src="/researchs.jpg"
                            alt="Foto do grupo"
                            width={1200}
                            height={960}
                            className="rounded-lg object-cover w-180 lg:h-120"
                            unoptimized
                        />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 py-6 border-b border-be-neutral-950">
                        <div className="flex-1 flex flex-col gap-3">
                            <span className="font-bold uppercase text-primary-700 font-sans text-sm">
                                CONHEÇA O GPES
                            </span>
                            <h2 className="font-display text-4xl font-black text-neutral-950">Como trabalhamos</h2>
                            <p className="text-neutral-950 font-sans">
                                Atuamos de forma colaborativa, unindo teoria e prática em cada projeto. Alunos de
                                diferentes níveis participam ativamente do processo de pesquisa, desenvolvimento e
                                publicação, sob orientação constante da coordenação do grupo. Buscamos aplicar
                                metodologias ágeis e boas práticas de engenharia de software em tudo o que produzimos —
                                do código aos artigos científicos —, sempre com o objetivo de gerar conhecimento que
                                beneficie tanto a comunidade acadêmica quanto a sociedade.
                            </p>
                        </div>

                        <Image
                            src="/works.jpg"
                            alt="Foto do grupo"
                            width={1200}
                            height={960}
                            className="rounded-lg object-center object-cover w-180 lg:h-120"
                            unoptimized
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PersonsPage;
