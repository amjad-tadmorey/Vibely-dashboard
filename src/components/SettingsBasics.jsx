import { useState } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button"

export default function SettingsBasics({ shop, updateShop }) {
    const { font, shop_name } = shop
    const [shopName, setShopName] = useState(shop.shop_name || '')
    const [fontName, setFontName] = useState(shop.font || '')

    const handleSave = (field, value) => {
        if (!value) return toast.error('Missing value')

        updateShop({
            match: { id: localStorage.getItem("shop_id") },
            updates: { ...shop, [field]: value }, // ⬅️ keeps other values unchanged
        })
    }

    return <>
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
        </div></>
}
