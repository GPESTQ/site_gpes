const Tooltip = ({ text, children }) => (
    <div className="relative group">
        {children}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-neutral-50 text-xs px-3 py-1 font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xs">
            {text}
        </span>
    </div>
);

export default Tooltip;