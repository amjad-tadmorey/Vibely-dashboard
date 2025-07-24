import { AnimatePresence, motion } from "framer-motion"
import { useSwipeNavigate } from "../hooks/custom/useSwipeNavigate"
import { useUpdate } from "../hooks/remote/useUpdate"
import { useGetOne } from '../hooks/remote/useGetOne'
import { useState } from "react"
import Button from "../ui/Button"
import Input from '../ui/Input'
import { platforms } from "../constants/local"
import SocialCard from "../ui/socialCard"

export default function Settings() {
    const handlers = useSwipeNavigate({
        right: '/feedback',
    })
    const { data: shop, isPending: isLoadingShop } = useGetOne('shops', 'shops')
    const { mutate: updateShop } = useUpdate('shops', 'shops')


    const [shopName, setShopName] = useState(shop?.shop_name || '')
    const [fontName, setFontName] = useState(shop?.shop_name || '')
    const [platformName, setPlatformName] = useState('')
    const [link, setLink] = useState('')
    const [colorHex, setColorHex] = useState('#ffffff');


    if (isLoadingShop) return null // must view a special ui if the shop_id not found

    const { color, font, social, logo, shop_name } = shop



    const handleSave = (field, value) => {
        updateShop({
            match: { id: localStorage.getItem("shop_id") },
            updates: { ...shop, [field]: value }, // ⬅️ keeps other values unchanged
        })
    }

    const handleAddSocial = (value) => {
        updateShop({
            match: { id: localStorage.getItem("shop_id") },
            updates: { ...shop, social: [...social, value] }, // ⬅️ keeps other values unchanged
        })
    }

    console.log(colorHex);


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
                    <div>
                        <label className="block font-medium text-sm text-gray-700">Shop Name</label>
                        <div className="flex items-center justify-between gap-2">
                            <Input

                                type="text"
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                className="w-full border rounded px-3 py-2 text-sm"
                                placeholder={shop_name}
                            />
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={() => handleSave('shop_name', shopName)}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                    <div>
                        <label className="block font-medium text-sm text-gray-700">Font Name</label>
                        <div className="flex items-center justify-between gap-2">
                            <Input
                                type="text"
                                value={fontName}
                                onChange={(e) => setFontName(e.target.value)}
                                className="w-full border rounded px-3 py-2 text-sm"
                                placeholder={font}
                            />
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={() => handleSave('font', fontName)}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                    <hr className="border-gray-200" />

                    <div>
                        <h1 className="block font-medium text-sm text-gray-700">Links</h1>

                        <div className="space-y-2">
                            {social.map(({ name, link }) => <SocialCard key={name} name={name} link={link} social={social} updateShop={updateShop} shop={shop} />)}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-gray-700">Add a new link</label>
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-stretch gap-2 w-full">
                                    <select
                                        value={platformName}
                                        onChange={(e) => setPlatformName(e.target.value)}
                                        className="px-2 rounded-3xl bg-white/40 border border-blue-100 text-gray-800 shadow
        placeholder-gray-600 focus:outline-none focus:border-[#4e6ef2] backdrop-blur"
                                    >
                                        <option value="" >platform</option>
                                        {platforms.map((platform) => (
                                            <option key={platform} value={platform}>
                                                {platform}
                                            </option>
                                        ))}
                                    </select>

                                    <Input
                                        type="text"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        className="w-full border rounded px-3 py-2 text-sm"
                                        placeholder="Link"
                                    />
                                </div>

                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => handleAddSocial({ name: platformName, link })}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-200" />
                    <div>
                        <h1 className="block font-medium text-sm text-gray-700">Color</h1>
                        <div className="flex items-center gap-4">
                            <label className="block font-medium text-sm text-gray-700">
                                Pick a Color
                            </label>
                            <input
                                type="color"
                                value={colorHex}
                                onChange={(e) => {
                                    const selectedColor = e.target.value;
                                    setColorHex(selectedColor);
                                }}
                                className="w-10 h-10 border rounded"
                            />
                            <span className="text-sm text-gray-600">{colorHex}</span>
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={() => handleSave('color', colorHex)}
                            >
                                Save
                            </Button>
                        </div>
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    )
}
