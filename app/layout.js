import AppProvider from "./context";
import "./globals.css";

export const metadata = {
    title: "Dota Draft App",
    description: "This project is made by Lerd Robott",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body>
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    );
}
