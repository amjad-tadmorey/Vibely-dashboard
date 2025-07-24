import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function CardSocial({ name, link, social, updateShop, shop }) {
    const [isDisappearing, setIsDisappearing] = useState(false)

    const handleDelete = (platformName) => {
        setIsDisappearing(true)
        setTimeout(() => {
            const updatedSocial = social.filter((item) => item.name !== platformName);

            updateShop({
                match: { id: localStorage.getItem("shop_id") },
                updates: {
                    ...shop,
                    social: updatedSocial,
                },
            });
        }, 200);
    };

    return <AnimatePresence>
        <motion.div
            layout // 👈 This line enables layout animation
            className="relative"
            exit={{ opacity: 0, scale: 0.9 }}
            initial={{ opacity: 1, scale: 1 }}
            animate={isDisappearing ? { opacity: 0, scale: 0.95 } : {}}
            transition={{ duration: 0.2 }}
        >
            <div
                className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md shadow-sm"
            >
                <div>
                    <p className="text-sm font-semibold">{name}</p>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm underline">
                        {link}
                    </a>
                </div>
                <button
                    onClick={() => handleDelete(name)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </motion.div>
    </AnimatePresence>
}
