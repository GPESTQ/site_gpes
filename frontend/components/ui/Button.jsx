export const buttonStyles =
    "bg-primary-700 text-neutral-50 text-sm font-bold font-sans px-4 py-3 flex items-center gap-3 rounded-lg w-fit hover:bg-primary-600 transition-all duration-300 ease-in-out active:bg-primary-800 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";

const Button = ({ children, isLoading, className = "", ...props }) => (
    <button className={`${buttonStyles} ${className}`} disabled={isLoading} {...props}>
        {children}
    </button>
);
export default Button;