import { CaretDownIcon } from "@phosphor-icons/react";

const Select = ({ id, label, disabled, children, className = "", ...props }) => (
    <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-sm text-neutral-950 font-medium font-sans">
            {label}
        </label>
        <div className="relative">
            <select
                id={id}
                name={id}
                disabled={disabled}
                className={`px-4 py-3 bg-neutral-50 border border-neutral-400 rounded-lg text-sm text-neutral-950 font-sans placeholder:text-neutral-400 appearance-none w-full ${className}`}
                {...props}
            >
                {children}
            </select>
            <CaretDownIcon size={24} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600" />
        </div>
    </div>
);
export default Select;