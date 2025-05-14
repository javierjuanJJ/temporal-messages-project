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

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <input
                    type="text"
                    placeholder="🔍 Buscar contenido..."
                    className="bg-zinc-800 text-sm text-white px-3 py-2 rounded-md w-full sm:w-72"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
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
                            onClick={() => setFilter(option)}
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

            {filtered.length === 0 ? (
                <p className="text-zinc-400">No hay mensajes con ese criterio.</p>
            ) : (
                filtered.map((msg, i) => (
                    <MessageItem key={msg.id} message={msg} index={i} onDelete={deleteMessage} />
                ))
            )}
        </div>
    );
}
