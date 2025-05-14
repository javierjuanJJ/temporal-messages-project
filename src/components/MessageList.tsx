import {useState} from "react";
import MessageItem from "./MessageItem";

type Message = {
    id: string;
    content: string;
    expires_at: string;
    read: boolean;
};

export default function MessageList({messages}: { messages: Message[] }) {
    const [list, setList] = useState(messages);

    const deleteMessage = async (id: string) => {
        const res = await fetch(`/api/messages/${id}`, {method: "DELETE"});
        if (res.ok) {
            setList(prev => prev.filter(msg => msg.id !== id));
        } else {
            alert("Error al eliminar el mensaje.");
        }
    };

    return (
        <div>
            {list.length === 0 ? (
                <p className="text-zinc-400">No hay mensajes aún.</p>
            ) : (
                list.map((msg, i) => (
                    <MessageItem key={msg.id} message={msg} index={i} onDelete={deleteMessage}/>
                ))
            )}
        </div>
    );
}
