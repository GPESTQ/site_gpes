"use client";
import Link from "next/link";
import { TrashIcon, NotePencilIcon } from "@phosphor-icons/react";

export const AdminTable = ({ children }) => (
    <div className="overflow-x-auto rounded-lg border border-neutral-950">
        <table className="w-full border-separate border-spacing-0 overflow-hidden">{children}</table>
    </div>
);

export const AdminTableHead = ({ children }) => (
    <thead>
        <tr className="text-sm text-neutral-50 rounded-t-lg bg-neutral-950 font-sans text-left">{children}</tr>
    </thead>
);

export const AdminTableHeader = ({ children, className = "" }) => (
    <th className={`px-6 py-3 font-medium ${className}`}>{children}</th>
);

export const AdminTableBody = ({ children }) => <tbody>{children}</tbody>;

export const AdminTableRow = ({ children }) => (
    <tr className="text-sm text-neutral-950 rounded-t-lg bg-neutral-50 font-sans text-left">{children}</tr>
);

export const AdminTableCell = ({ children, className = "" }) => (
    <td className={`px-6 py-3 ${className}`}>{children}</td>
);

// A parte que se repete em toda tela de listagem: editar + excluir
export const AdminTableActions = ({ editHref, onDelete }) => (
    <AdminTableCell>
        <div className="flex justify-center gap-2">
            <Link
                href={editHref}
                className="flex items-center p-2 text-neutral-950 hover:bg-neutral-200 rounded-lg transition-all duration-300 ease-in-out font-medium"
            >
                <NotePencilIcon size={24} />
            </Link>
            <button
                onClick={onDelete}
                className="flex items-center p-2 text-neutral-950 hover:bg-neutral-200 rounded-lg cursor-pointer transition-all duration-300 ease-in-out font-medium"
            >
                <TrashIcon size={24} />
            </button>
        </div>
    </AdminTableCell>
);