import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import CopyLinkWithFeedback from "./CopyLinkWithFeedback";

type Message = {
    id: string;
    content: string;
    expires_at: string;
    read: boolean;
};

export default function MessageItem({
                                        message,
                                        onDelete,
                                        index,
                                    }: {
    message: Message;
    onDelete: (id: string) => void;
    index: number;
}) {
    const [confirming, setConfirming] = useState(false);
    const expired = new Date(message.expires_at) < new Date();
    const url = `${location.origin}/m/${message.id}`;

    return (
        <AnimatePresence>
            <motion.div
                key={message.id}
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0, transition: {delay: index * 0.05}}}
                exit={{opacity: 0, x: -20, transition: {duration: 0.2}}}
                layout
                className={`p-4 rounded-md border ${
                    expired ? "border-red-500" : "border-zinc-700"
                } bg-zinc-900 mb-3`}
            >
                <p className="text-sm text-zinc-400 mb-2">
                    <strong>Expira:</strong>{" "}
                    {new Date(message.expires_at).toLocaleString()} ·
                    <strong> Estado:</strong>{" "}
                    {message.read ? "Leído" : expired ? "Expirado" : "Activo"}
                </p>

                <div className="text-zinc-300 text-sm truncate">
                    {message.content.slice(0, 100)}
                    {message.content.length > 100 ? "..." : ""}
                </div>

                <CopyLinkWithFeedback link={url}/>

                <div className="mt-3 flex gap-2">
                    {!confirming ? (
                        <button
                            className="text-sm text-red-400 hover:underline"
                            onClick={() => setConfirming(true)}
                        >
                            🗑️ Eliminar
                        </button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-zinc-400">¿Confirmar?</span>
                            <button
                                onClick={() => onDelete(message.id)}
                                className="text-sm text-red-500 font-semibold"
                            >
                                Sí
                            </button>
                            <button
                                onClick={() => setConfirming(false)}
                                className="text-sm text-zinc-400 hover:text-white"
                            >
                                No
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
