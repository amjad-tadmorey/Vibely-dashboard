import { AnimatePresence, motion } from "framer-motion";
import { useGet } from "../hooks/remote/useGet";
import { shop_id, USERS_LIMIT } from "../constants/local";
import Spinner from "../ui/Spinner";
import { Mail, Phone, ShieldCheck, User } from "lucide-react";
import { useSwipeNavigate } from "../hooks/custom/useSwipeNavigate";
import ErrorMessage from "../components/ErrorMessage";
import { FaWhatsapp } from "react-icons/fa";


export default function Users() {
    const handlers = useSwipeNavigate({
        right: '/settings'
    })

    const { data: users, isPending, error } = useGet('profiles', {
        filters: [{ column: 'shop_id', operator: 'eq', value: shop_id }],
    })
    const { data: shop, isPending: isPendingShop, error: errorShop } = useGet('shops', {
        filters: [{ column: 'id', operator: 'eq', value: shop_id }],
    })

    if (error || errorShop) return <ErrorMessage />
    if (isPending || isPendingShop) return <Spinner />


    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full"
            >
                <div {...handlers} className="p-4">
                    <h2 className="text-xl font-bold mb-4">Users in this Shop</h2>
                    <ul className="space-y-2">
                        {users.map((user) => (
                            <li key={user.id} className="p-3 bg-gray-100 rounded shadow flex flex-col gap-2">
                                <p className="flex items-center gap-4"><User />{user.email}</p>
                                {user.role && <p className="flex items-center gap-4"><ShieldCheck />{user.role}</p>}
                            </li>
                        ))}
                    </ul>

                    {
                        USERS_LIMIT > shop[0].users &&
                        <>
                            <div className="text-center font-semibold mt-4">Please contact us if you want to create a user you have {USERS_LIMIT - shop[0].users} users available</div>

                            <div className="flex gap-4 w-full justify-center mt-4">
                                <a
                                    href="tel:+201227139914"
                                    className="inline-flex items-center gap-2 px-1"
                                >
                                    <Phone size={30} color="#6ec1f6" />
                                </a>
                                <a
                                    href="https://wa.me/201227139914"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-1"
                                >
                                    <FaWhatsapp size={30} color="#6ec1f6" />
                                </a>
                                <a
                                    href="mailto:amjadtadmory@gmail.com"
                                    className="inline-flex items-center gap-2 px-1"
                                >
                                    <Mail size={30} color="#6ec1f6" />
                                </a>
                            </div>

                            <h1 className="font-bold text-[#6ec1f6] text-xl mt-2 text-center">Support Contacts</h1>
                        </>
                    }

                </div>

            </motion.div>
        </AnimatePresence>
    );
}
