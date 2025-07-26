import { useState } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button"

export default function SettingsBasics({ shop, updateShop }) {
    const { font, shop_name } = shop
    const [shopName, setShopName] = useState(shop.shop_name || '')
    const [fontName, setFontName] = useState(shop.font || '')
    const [welcome, setWelcome] = useState(shop.welcome_title || '')
    const [language, setLanguage] = useState(shop.language || '')

    const handleSave = (field, value) => {
        if (!value) return toast.error('Missing value')

        updateShop({
            match: { id: localStorage.getItem("shop_id") },
            updates: { ...shop, [field]: value }, // ⬅️ keeps other values unchanged
        })
    }

    return <>

        <>
            <label className="block font-medium text-sm text-gray-700">Language</label>
            <div className="flex items-center justify-between gap-2">
                <select
                    name=""
                    id=""
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full border rounded-xl px-3 py-2 text-sm p-4  bg-white/40 border-blue-100 text-gray-800 shadow
        placeholder-gray-600 focus:outline-none focus:border-[#4e6ef2] backdrop-blur"
                >
                    <option value="AR">AR</option>
                    <option value="EN">EN</option>
                </select>
                <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleSave('language', language)}
                >
                    Save
                </Button>
            </div>
        </>
        <>
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
        </>

        <>
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
        </>

        <>
            <label className="block font-medium text-sm text-gray-700">Welcome Title</label>
            <div className="flex items-center justify-between gap-2">
                <Input
                    type="text"
                    value={welcome}
                    onChange={(e) => setWelcome(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder={font}
                />
                <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleSave('welcome_title', welcome)}
                >
                    Save
                </Button>
            </div>
        </>
    </>
}
