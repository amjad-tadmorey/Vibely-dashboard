import { AnimatePresence, motion } from "framer-motion"
import { useSwipeNavigate } from "../hooks/custom/useSwipeNavigate"
import { useUpdate } from "../hooks/remote/useUpdate"
import { useGetOne } from '../hooks/remote/useGetOne'
import SettingsBasics from "../components/SettingsBasics"
import SettingsLinks from "../components/SettingsLinks"
import SettingsColor from "../components/SettingsColor"
import SettingsLogo from "../components/SettingsLogo"

export default function Settings() {
    const handlers = useSwipeNavigate({
        right: '/feedback',
        left: '/users',
    })

    const { data: shop, isPending } = useGetOne('shops', 'shops')
    const { mutate: updateShop } = useUpdate('shops', 'shops')

    if (isPending) return null // must view a special ui if the shop_id not found

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
