import Link from "next/link";
import { buttonStyles } from "./Button";

const LinkButton = ({ children, href, className = "", ...props }) => (
    <Link href={href} className={`${buttonStyles} ${className}`} {...props}>
        {children}
    </Link>
);
export default LinkButton;