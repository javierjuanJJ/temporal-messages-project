import { useTheme } from "../hooks/useTheme";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-zinc-950 text-white" : "bg-zinc-50 text-black"}`}>
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main className="p-6">{children}</main>
        </div>
    );
}
