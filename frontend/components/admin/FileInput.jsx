import { CloudArrowUpIcon, WarningIcon } from "@phosphor-icons/react";

const FileInput = ({
    id,
    label,
    hasFile,
    showWarning,
    warningText = "Atenção: caso não selecione uma foto de perfil, será utilizado uma imagem padrão.",
    hint = "Formatos aceitos: PNG, JPEG, WEBP",
    hintRight,
    disabled,
    ...props
}) => {
    // Se showWarning for passado explicitamente, ele manda — senão, cai no
    // comportamento padrão de só avisar quando não há arquivo selecionado.
    const shouldShowWarning = showWarning !== undefined ? showWarning : !hasFile;

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-sm text-neutral-950 font-medium font-sans">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    name={id}
                    type="file"
                    disabled={disabled}
                    className="px-4 py-3 bg-neutral-50 border border-neutral-400 rounded-lg text-sm text-neutral-950 font-sans file:mr-6 cursor-pointer file:hidden w-full"
                    {...props}
                />
                <CloudArrowUpIcon size={24} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600" />
            </div>
            <div className="flex justify-between">
                <p className="text-sm text-neutral-700">{hint}</p>
                {hintRight && <p className="text-sm text-neutral-700 text-end">{hintRight}</p>}
            </div>
            {shouldShowWarning && warningText && (
                <div className="flex items-center mt-2 gap-3 rounded-lg px-4 py-3 bg-warning-100 border border-warning-400">
                    <WarningIcon size={24} className="text-warning-700" />
                    <p className="text-warning-700 text-sm font-sans">{warningText}</p>
                </div>
            )}
        </div>
    );
};
export default FileInput;