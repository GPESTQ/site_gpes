import { ListIcon } from "@phosphor-icons/react";
import Image from "next/image"

const AdminNavbar = ({ setIsOpen }) => {
    return (
        <header className="w-screen flex items-center gap-4 bg-neutral-950 px-6 py-4 fixed z-10">
            <input
                id="sidebar"
                type="checkbox"
                className="hidden"
                onChange={(e) => {
                    setIsOpen(e.target.checked);
                }}
            />
            <label
                htmlFor="sidebar"
                className="lg:hidden size-10 flex items-center justify-center rounded-full text-neutral-300 hover:bg-neutral-900 hover:text-neutral-50 cursor-pointer"
            >
                <ListIcon size={24} />
            </label>

            <Image src="/logo-gpes.png" alt="Logo do GPES" width={192} height={48} className="h-12"/>
        </header>
    );
};
export default AdminNavbar;
