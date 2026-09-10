"use client";
import Image from "next/image";
import { CloudArrowUpIcon, XIcon, WarningIcon } from "@phosphor-icons/react";

const MultiFileInput = ({ id, label, files, onChange, maxFiles = 10, existingUrls = [], onRemoveExisting, disabled, hint, hintRight }) => {
    const totalCount = files.length + existingUrls.length;
    const remainingSlots = maxFiles - totalCount;

    const handleChange = (e) => {
        const selected = Array.from(e.target.files || []);
        if (selected.length === 0) return;

        if (selected.length > remainingSlots) {
            onChange([...files, ...selected.slice(0, remainingSlots)]);
        } else {
            onChange([...files, ...selected]);
        }
        e.target.value = ""; // permite selecionar o mesmo arquivo de novo depois de remover
    };

    const removeNewFile = (index) => {
        onChange(files.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-sm text-neutral-950 font-medium font-sans">
                {label}
            </label>

            <div className="relative">
                <input
                    id={id}
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/webp"
                    disabled={disabled || remainingSlots <= 0}
                    onChange={handleChange}
                    className="px-4 py-3 bg-neutral-50 border border-neutral-400 rounded-lg text-sm text-neutral-950 font-sans file:mr-6 cursor-pointer file:hidden w-full disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <CloudArrowUpIcon size={24} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600" />
            </div>

            <div className="flex justify-between">
                <p className="text-sm text-neutral-700">{hint}</p>
                {hintRight && <p className="text-sm text-neutral-700 text-end">{hintRight}</p>}
            </div>

            {remainingSlots <= 0 && (
                <div className="flex items-center gap-3 rounded-lg px-4 py-3 bg-warning-100 border border-warning-400">
                    <WarningIcon size={24} className="text-warning-700" />
                    <p className="text-warning-700 text-sm font-sans">Limite máximo de {maxFiles} imagens atingido.</p>
                </div>
            )}

            {(existingUrls.length > 0 || files.length > 0) && (
                <div className="grid grid-cols-4 gap-3 mt-2">
                    {existingUrls.map((url, index) => (
                        <div key={`existing-${url}`} className="relative">
                            <Image
                                src={url}
                                alt={`Imagem ${index + 1}`}
                                width={100}
                                height={100}
                                className="rounded-lg object-cover size-24 w-full"
                                unoptimized
                            />
                            {onRemoveExisting && (
                                <button
                                    type="button"
                                    onClick={() => onRemoveExisting(url)}
                                    className="absolute -top-2 -right-2 bg-neutral-950 text-neutral-50 rounded-full p-1"
                                >
                                    <XIcon size={12} />
                                </button>
                            )}
                        </div>
                    ))}
                    {files.map((file, index) => (
                        <div key={`new-${index}`} className="relative">
                            <Image
                                src={URL.createObjectURL(file)}
                                alt={`Nova imagem ${index + 1}`}
                                width={100}
                                height={100}
                                className="rounded-lg object-cover size-24 w-full"
                                unoptimized
                            />
                            <button
                                type="button"
                                onClick={() => removeNewFile(index)}
                                className="absolute -top-2 -right-2 bg-neutral-950 text-neutral-50 rounded-full p-1"
                            >
                                <XIcon size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default MultiFileInput;