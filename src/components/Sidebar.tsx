import clsx from "clsx"; // opcional: para clases condicionales

export default function Sidebar({ open }: { open: boolean }) {
    return (
        <aside
            className={
            clsx(
                {
                    "bg-zinc-900 text-white w-64 p-4 h-screen fixed md:relative z-40 transition-transform duration-300",
                    "translate-x-0": open,
                    "-translate-x-full": !open,
                    "md:translate-x-0": true,
                }
            )}
        >
            <nav className="flex flex-col gap-4">
                <a href="/mensajes">📨 Mensajes</a>
                <a href="/historial">📂 Historial</a>
                <a href="/papelera">🗑 Papelera</a>
                <a href="/configuracion">⚙️ Configuración</a>
            </nav>
        </aside>
    );
}
