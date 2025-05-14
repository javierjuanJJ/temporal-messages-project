import { motion } from "framer-motion";

export default function MessageItem({ message, index, onDelete }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-zinc-800 p-4 rounded-md border border-zinc-700 text-white relative"
        >
            <p className="text-sm">{message.content}</p>
            <div className="flex justify-between mt-2 text-xs text-zinc-400">
                <span>Expira: {new Date(message.expires_at).toLocaleString()}</span>
                <span>{message.read ? "Leído ✅" : "No leído"}</span>
            </div>
            <button
                onClick={() => onDelete(message.id)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-500 text-sm"
            >
                ✖
            </button>
        </motion.div>
    );
}
