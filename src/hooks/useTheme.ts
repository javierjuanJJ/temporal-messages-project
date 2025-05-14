import { useState, useEffect } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    // Al montar: leer localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, []);

    // Aplicar tema y guardar en localStorage cuando cambia
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Alternar entre temas
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return { theme, toggleTheme };
};
