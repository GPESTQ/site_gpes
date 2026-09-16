"use client";
import { projectStatusLabel } from "../lib/projectOptions.js";
import Link from "next/link";
import Image from "next/image";

const ProjectCard = ({ project }) => {
    return (
        <Link href={`projetos/${project.id}`} className="flex flex-col lg:flex-row lg:items-center gap-3 pb-6 border-b border-neutral-950">
            <div className="flex-1 flex flex-col gap-3">
                <span className="font-bold uppercase text-primary-700 font-sans text-sm">
                    {projectStatusLabel[project.status]}
                </span>
                <h2 className="font-display text-2xl font-black text-neutral-950">{project.title}</h2>
                <p className="font-sans text-sm text-neutral-950 line-clamp-3">{project.description}</p>
                <span className="font-sans text-sm font-medium text-neutral-950">
                    {project.members.map((member) => member.person.name).join(", ")}
                </span>
                <span className="font-sans text-sm font-medium text-neutral-950">
                    {project.startedYear}
                    {project.endedYear && project.startedYear != project.endedYear && " - " + project.endedYear}
                </span>
            </div>
            <div>
                <Image
                    src={project.images?.[0]?.url || "/image-placeholder.png"}
                    alt={project.title}
                    width={200}
                    height={150}
                    className="rounded-lg object-cover w-96 h-48"
                    unoptimized
                />
            </div>
        </Link>
    );
};

export default ProjectCard;