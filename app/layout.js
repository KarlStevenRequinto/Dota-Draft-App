import { Goldman } from "next/font/google";
import AppProvider from "./context";
import "./globals.css";

const goldman = Goldman({ subsets: ["latin"], weight: "400" });

export const metadata = {
    title: "Dota Draft App",
    description: "This project is made by Lerd Robott",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            suppressHydrationWarning={true}
            style={{ backgroundColor: "red" }}
        >
            <body className={goldman.className}>
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    );
}
