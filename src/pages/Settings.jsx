import { AnimatePresence, motion } from "framer-motion"
import { useSwipeNavigate } from "../hooks/custom/useSwipeNavigate"
import { useUpdate } from "../hooks/remote/useUpdate"
import { useGet } from '../hooks/remote/useGet'
import SettingsBasics from "../components/SettingsBasics"
import SettingsLinks from "../components/SettingsLinks"
import SettingsColor from "../components/SettingsColor"
import SettingsLogo from "../components/SettingsLogo"
import { shop_id } from "../constants/local"
import Spinner from "../ui/Spinner"
import ErrorMessage from "../components/ErrorMessage"

export default function Settings() {
    const handlers = useSwipeNavigate({
        right: '/qr',
        left: '/users',
    })

    const { data, isPending, error } = useGet('shops', {
        filters: [{ column: 'id', operator: 'eq', value: shop_id }],
    })

    const { mutate: updateShop } = useUpdate('shops', 'shops')


    if(error) return <ErrorMessage />
    if (isPending) return <Spinner />
    const shop = data[0]
    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full"
            >
                <div {...handlers} className="p-4 space-y-4 max-w-md mx-auto">
                    <h2 className="text-xl font-bold mb-4">Shop customization</h2>

                    <SettingsBasics shop={shop} updateShop={updateShop} />
                    <hr className="border-gray-200" />

                    <SettingsLinks shop={shop} updateShop={updateShop} />
                    <hr className="border-gray-200" />

                    <SettingsColor shop={shop} updateShop={updateShop} />
                    <hr className="border-gray-200" />

                    <SettingsLogo shop={shop} updateShop={updateShop} />
                </div>


            </motion.div>
        </AnimatePresence>
    )
}
