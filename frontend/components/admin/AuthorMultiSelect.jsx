"use client";
import { useState, useRef, useEffect } from "react";
import { CaretDownIcon, MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";

const AuthorMultiSelect = ({ label, options, selected, onChange, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const containerRef = useRef(null);

    // Fecha o dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = options.filter((option) =>
        option.name.toLowerCase().includes(search.toLowerCase())
    );

    const toggleAuthor = (id) => {
        if (selected.includes(id)) {
            onChange(selected.filter((authorId) => authorId !== id));
        } else {
            onChange([...selected, id]); // mantém a ordem de seleção
        }
    };

    const removeAuthor = (id) => {
        onChange(selected.filter((authorId) => authorId !== id));
    };

    const selectedPersons = selected
        .map((id) => options.find((option) => option.id === id))
        .filter(Boolean); // remove undefined caso um id não bata com nenhuma opção

    return (
        <div className="flex flex-col gap-2" ref={containerRef}>
            <label className="text-sm text-neutral-950 font-medium font-sans">{label}</label>

            <div className="relative">
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-neutral-50 border border-neutral-400 rounded-lg text-sm text-neutral-950 font-sans disabled:opacity-60"
                >
                    <span className={selected.length === 0 ? "text-neutral-600" : ""}>
                        {selected.length === 0
                            ? "Selecione os autores"
                            : `${selected.length} autor${selected.length > 1 ? "es" : ""} selecionado${selected.length > 1 ? "s" : ""}`}
                    </span>
                    <CaretDownIcon size={24} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                    <div className="absolute z-8 mt-2 w-full bg-neutral-50 border border-neutral-400 rounded-lg shadow-lg overflow-hidden">
                        <div className="relative p-2 border-b border-neutral-300">
                            <MagnifyingGlassIcon
                                size={24}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600"
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar pessoa..."
                                className="w-full pl-4 pr-14 py-2 text-sm font-sans outline-none"
                                autoFocus
                            />
                        </div>

                        <div className="max-h-56 overflow-y-auto">
                            {filteredOptions.length === 0 && (
                                <p className="px-4 py-3 text-sm text-neutral-500 font-sans">Nenhuma pessoa encontrada</p>
                            )}
                            {filteredOptions.map((option) => (
                                <label
                                    key={option.id}
                                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-100 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(option.id)}
                                        onChange={() => toggleAuthor(option.id)}
                                        className="size-4 accent-primary-700"
                                    />
                                    <span className="text-sm font-sans text-neutral-900">{option.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {selectedPersons.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                    {selectedPersons.map((person, index) => (
                        <span
                            key={person.id}
                            className="flex items-center gap-2 bg-primary-700 text-neutral-50 text-xs font-sans font-medium px-3 py-1.5 rounded-full"
                        >
                            {index + 1}º {person.name}
                            <button type="button" onClick={() => removeAuthor(person.id)}>
                                <XIcon size={14} />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};
export default AuthorMultiSelect;