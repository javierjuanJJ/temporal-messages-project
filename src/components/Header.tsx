export default function Header({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
    return (
        <header className="flex justify-between items-center py-4 px-6 bg-zinc-900 text-white">
            <h1 className="text-xl font-bold">MicroPaste</h1>
            <button
                onClick={toggleTheme}
                className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-full"
            >
                {theme === "light" ? "🌙" : "🌞"}
            </button>
        </header>
    );
}
