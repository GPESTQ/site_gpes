"use client";
import { paperTypeLabel } from "../lib/papersOptions.js";
import { formatDate } from "../lib/utils.js";
import Link from "next/link";

const PersonCard = ({ paper }) => (
    <Link href={`publicacoes/${paper.id}`} className="flex flex-col gap-3 pb-6 border-b border-neutral-950">
        <span className="font-bold uppercase text-primary-700 font-sans text-sm">{paperTypeLabel[paper.type]}</span>
        <h2 className="font-display text-2xl font-black text-neutral-950">{paper.title}</h2>
        <p className="font-sans text-sm text-neutral-950 line-clamp-3">{paper.abstract}</p>
        <span className="font-sans text-sm font-medium text-neutral-950">{paper.authors.map((author) => author.person.name).join(", ")}</span>
        <span className="font-sans text-sm font-medium text-neutral-950">{formatDate(paper.publishedAt)}</span>
    </Link>
);

export default PersonCard;
