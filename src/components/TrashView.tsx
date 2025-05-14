export default function TrashView({ trash, onRestore, onPurge }: any) {
    const activeTrash = trash.filter(msg => new Date(msg.trashExpiresAt) > new Date());


    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">🗑️ Papelera</h2>

            {activeTrash.length === 0 && <p className="text-zinc-400">No hay mensajes eliminados recientemente.</p>}

            {activeTrash.map((msg: any, i: number) => (
                <div
                    key={msg.id}
                    className="bg-zinc-800 border border-zinc-700 p-4 rounded-md text-sm text-white flex justify-between items-center"
                >
                    <span className="truncate">{msg.content}</span>
                    <div className="flex gap-2">
                        <button onClick={() => onRestore(msg.id)} className="text-green-400 hover:underline">
                            Restaurar
                        </button>
                        <button onClick={() => onPurge(msg.id)} className="text-red-500 hover:underline">
                            Purgar
                        </button>
                    </div>
                </div>
            ))}

            {activeTrash.length > 0 && (
                <div className="flex justify-end">
                    <button
                        onClick={() => {
                            if (confirm("¿Purgar todos los mensajes eliminados? Esta acción es irreversible.")) {
                                onPurge("all");
                            }
                        }}
                        className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                    >
                        ❌ Purgar todo
                    </button>
                </div>
            )}
        </div>
    );
}
