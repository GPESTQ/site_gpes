"use client";
import { useState } from "react";
import { EyeIcon, EyeClosedIcon } from "@phosphor-icons/react";

const InputField = ({ id, label, type = "text", disabled, labelClassName = "text-neutral-950", className = "", ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const resolvedType = isPassword && showPassword ? "text" : type;

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className={`text-sm font-medium font-sans ${labelClassName}`}>
                {label}
            </label>
            <div className="relative">
                <input
                    type={resolvedType}
                    id={id}
                    name={id}
                    disabled={disabled}
                    className={`px-4 py-3 bg-neutral-50 border border-neutral-400 rounded-lg text-sm text-neutral-950 font-sans placeholder:text-neutral-400 w-full ${isPassword ? "pr-12" : ""} ${className}`}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={disabled}
                        tabIndex={-1}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 disabled:opacity-40"
                    >
                        {showPassword ? <EyeIcon size={20} /> : <EyeClosedIcon size={20} />}
                    </button>
                )}
            </div>
        </div>
    );
};
export default InputField;