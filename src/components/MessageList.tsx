import { useState, useMemo } from "react";
import MessageItem from "./MessageItem";

type Message = {
    id: string;
    content: string;
    expires_at: string;
    read: boolean;
};

type Filter = "all" | "active" | "read" | "expired";

export default function MessageList({ messages }: { messages: Message[] }) {
    const [list, setList] = useState(messages);
    const [filter, setFilter] = useState<Filter>("all");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 5;

    const deleteMessage = async (id: string) => {
        const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
        if (res.ok) {
            setList(prev => prev.filter(msg => msg.id !== id));
        } else {
            alert("Error al eliminar el mensaje.");
        }
    };

    const now = new Date();

    const filtered = useMemo(() => {
        return list
            .filter(msg => {
                const expired = new Date(msg.expires_at) < now;
                if (filter === "read") return msg.read;
                if (filter === "expired") return expired;
                if (filter === "active") return !msg.read && !expired;
                return true;
            })
            .filter(msg => msg.content.toLowerCase().includes(search.toLowerCase()));
    }, [list, filter, search]);

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const exportAsJSON = () => {
        const dataStr = JSON.stringify(filtered, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        downloadBlob(blob, "mensajes.json");
    };

    const exportAsText = () => {
        const text = filtered
            .map(msg => `Mensaje: ${msg.content}\nExpira: ${msg.expires_at}\nLeído: ${msg.read}\n`)
            .join("\n---\n");
        const blob = new Blob([text], { type: "text/plain" });
        downloadBlob(blob, "mensajes.txt");
    };

    const downloadBlob = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-4">
            {/* 🔍 Búsqueda y Filtros */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <input
                    type="text"
                    placeholder="🔍 Buscar contenido..."
                    className="bg-zinc-800 text-sm text-white px-3 py-2 rounded-md w-full sm:w-72"
                    value={search}
                    onChange={e => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />
                <div className="flex gap-2">
                    {(["all", "active", "read", "expired"] as Filter[]).map(option => (
                        <button
                            key={option}
                            className={`text-sm px-3 py-1 rounded-md ${
                                filter === option
                                    ? "bg-indigo-600 text-white"
                                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                            }`}
                            onClick={() => {
                                setFilter(option);
                                setPage(1);
                            }}
                        >
                            {
                                { all: "Todos", active: "Activos", read: "Leídos", expired: "Expirados" }[
                                    option
                                    ]
                            }
                        </button>
                    ))}
                </div>
            </div>

            {/* 📤 Exportar */}
            <div className="flex justify-end gap-2 text-sm text-zinc-300">
                <button
                    onClick={exportAsJSON}
                    className="bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded-md"
                >
                    📦 Exportar JSON
                </button>
                <button
                    onClick={exportAsText}
                    className="bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded-md"
                >
                    📄 Exportar TXT
                </button>
            </div>

            {/* 📜 Mensajes paginados */}
            {paginated.length === 0 ? (
                <p className="text-zinc-400">No hay mensajes con ese criterio.</p>
            ) : (
                paginated.map((msg, i) => (
                    <MessageItem key={msg.id} message={msg} index={i} onDelete={deleteMessage} />
                ))
            )}

            {/* 📚 Controles de paginación */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-4 text-sm text-zinc-400">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40"
                    >
                        ⬅️ Anterior
                    </button>
                    <span>
            Página {page} de {totalPages}
          </span>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40"
                    >
                        Siguiente ➡️
                    </button>
                </div>
            )}
        </div>
    );
}
