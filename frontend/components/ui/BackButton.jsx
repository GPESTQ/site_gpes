import { ArrowLeftIcon } from "@phosphor-icons/react";
import Link from "next/link";

const BackButton = ({ href }) => (
    <Link
        href={href}
        className="bg-neutral-950 text-neutral-50 text-sm font-bold font-sans px-3 lg:px-4 py-3 flex items-center gap-3 rounded-lg w-fit hover:bg-neutral-900 transition-colors duration-300 ease-in-out"
    >
        <ArrowLeftIcon size={24} />
        <span className="hidden lg:block">VOLTAR</span>
    </Link>
);
export default BackButton;