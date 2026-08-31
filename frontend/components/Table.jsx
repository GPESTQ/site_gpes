export const Table = ({ children, className = "" }) => (
    <div className="w-full overflow-x-auto rounded-sm shadow-sm">
        <table className={`w-full border-collapse ${className}`}>
            {children}
        </table>
    </div>
);

export const TableHead = ({ children }) => (
    <thead className="bg-neutral-900">
        {children}
    </thead>
);

export const TableBody = ({ children }) => (
    <tbody>
        {children}
    </tbody>
);

export const TableRow = ({ children, className = "", ...props }) => (
    <tr
        className={`border-b border-neutral-200 transition-colors duration-150 ${className}`}
        {...props}
    >
        {children}
    </tr>
);

export const TableHeader = ({ children, className = "" }) => (
    <th className={`px-4 py-3 text-left font-sans text-xs font-bold uppercase tracking-wider text-neutral-50 ${className}`}>
        {children}
    </th>
);

export const TableCell = ({ children, className = "" }) => (
    <td className={`bg-neutral-50 px-4 py-3 font-sans text-sm text-neutral-900 ${className}`}>
        {children}
    </td>
);