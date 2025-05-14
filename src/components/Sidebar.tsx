import clsx from "clsx"; // opcional: para clases condicionales
import "../styles/global.css";
import {NavLink} from "react-router";
export default function Sidebar({ open }: { open: boolean }) {
    return (
        <aside
            className={
            //"bg-zinc-900 text-white w-64 p-4 h-screen fixed md:relative z-40 transition-transform duration-300",

                clsx(
                    { "translate-x-0": open,
                        "-translate-x-full": !open,
                        "md:translate-x-0": true },
                    "bg-zinc-900 text-white w-64 p-4 h-screen fixed md:relative z-40 transition-transform duration-300"
            )}
        >
            <nav className="flex flex-col gap-4">
                <NavLink
                    to="/messages"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-800 ${
                            isActive ? "bg-zinc-800 text-indigo-400" : "text-zinc-300"
                        }`
                    }
                >
                    📩 Mensajes
                </NavLink>

                <NavLink
                    to="/history"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-800 ${
                            isActive ? "bg-zinc-800 text-indigo-400" : "text-zinc-300"
                        }`
                    }
                >
                    📜 Historial
                </NavLink>

                <NavLink
                    to="/trash"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-800 ${
                            isActive ? "bg-zinc-800 text-red-400" : "text-zinc-300"
                        }`
                    }
                >
                    🗑️ Papelera
                </NavLink>
                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-800 ${
                            isActive ? "bg-zinc-800 text-indigo-400" : "text-zinc-300"
                        }`
                    }
                >
                    ⚙️ Configuración
                </NavLink>

            </nav>
        </aside>
    );
}
