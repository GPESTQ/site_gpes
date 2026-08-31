import "./globals.css";
import { Roboto, Playfair_Display } from "next/font/google";
import { AuthProvider } from "../hooks/useAuth.jsx";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    variable: "--font-roboto",
});

const playfairDisplay = Playfair_Display({
    weight: ["700", "900"],
    subsets: ["latin"],
    variable: "--font-playfair",
});
export const metadata = {
    title: "GPES",
    description: "Site do grupo de pesquisa em engenharia de software GPES.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR" className={`${roboto.variable} ${playfairDisplay.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col">
                <AuthProvider>
                    {children}
                    <Toaster />
                </AuthProvider>
            </body>
        </html>
    );
}
