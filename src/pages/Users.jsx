import { AnimatePresence, motion } from "framer-motion";
import { useGet } from "../hooks/remote/useGet";
import { shop_id } from "../constants/local";
import Spinner from "../ui/Spinner";
import { ShieldCheck, User } from "lucide-react";


export default function Users() {
    const { data: users, isPending } = useGet('profiles', {
        filters: [{ column: 'shop_id', operator: 'eq', value: shop_id }],
    })


    if (isPending) return <Spinner />
    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full"
            >
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Users in this Shop</h2>
                    <ul className="space-y-2">
                        {users.map((user) => (
                            <li key={user.id} className="p-3 bg-gray-100 rounded shadow flex flex-col gap-2">
                                <p className="flex items-center gap-4"><User />{user.email}</p>
                                {user.role && <p className="flex items-center gap-4"><ShieldCheck />{user.role}</p>}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
