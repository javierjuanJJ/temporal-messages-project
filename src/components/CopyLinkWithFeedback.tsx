import {useState} from "react";
import {motion} from "framer-motion";

type Props = {
    link: string;
};

export default function CopyLinkWithFeedback({link}: Props) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center gap-2 mt-2">
            <button
                onClick={handleCopy}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded-md transition"
            >
                📋 Copiar enlace
            </button>

            <motion.div
                initial={{opacity: 0, y: -5}}
                animate={copied ? {opacity: 1, y: 0} : {opacity: 0, y: -5}}
                transition={{duration: 0.3}}
                className="text-green-400 text-sm"
            >
                ¡Copiado!
            </motion.div>
        </div>
    );
}
