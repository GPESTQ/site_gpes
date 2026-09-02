"use client";
import { LinkedinLogoIcon, UserListIcon, EnvelopeIcon } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import Image from "next/image";

import Tooltip from "./Tooltip";
import { roleLabel, occupationLabel } from "../lib/personOptions.js";

const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copiado!");
};

const PersonCard = ({ person }) => (
    <div className="flex gap-6 pb-6 border-b border-neutral-950">
        <Image
            src={person.photoUrl || "/profile-image-placeholder.png"}
            alt={person.name}
            width={120}
            height={120}
            className="rounded-lg object-cover size-30"
            unoptimized
        />
        <div className="flex flex-col gap-2">
            <span className="font-bold uppercase text-primary-700 font-sans text-sm">{roleLabel[person.role]}</span>
            <h2 className="font-display text-2xl font-black text-neutral-950">{person.name}</h2>
            <span className="font-sans text-sm font-medium text-neutral-950">{occupationLabel[person.occupation]}</span>
            {person.links && (
                <div className="flex gap-3">
                    {person.links.linkedin && (
                        <Tooltip text="LinkedIn">
                            <a href={person.links.linkedin} target="_blank" rel="noreferrer">
                                <LinkedinLogoIcon className="size-6 text-neutral-950" />
                            </a>
                        </Tooltip>
                    )}
                    {person.links.lattes && (
                        <Tooltip text="Lattes">
                            <a href={person.links.lattes} target="_blank" rel="noreferrer">
                                <UserListIcon className="size-6 text-neutral-950" />
                            </a>
                        </Tooltip>
                    )}
                    {person.links.email && (
                        <Tooltip text="Copiar email">
                            <button onClick={() => copyEmail(person.links.email)} className="cursor-pointer">
                                <EnvelopeIcon className="size-6 text-neutral-950" />
                            </button>
                        </Tooltip>
                    )}
                </div>
            )}
        </div>
    </div>
);

export default PersonCard;
