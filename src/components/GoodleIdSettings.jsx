import { useState } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button"
import toast from "react-hot-toast"

export default function GoogleIdSettings({ shop, updateShop }) {
    const { google_id } = shop
    const [googleId, setGoogleId] = useState(shop.google_id || '')

    const handleSave = (field, value) => {
        if (!value) return toast.error('Missing value')

        updateShop({
            match: { id: localStorage.getItem("shop_id") },
            updates: { ...shop, [field]: value }, // ⬅️ keeps other values unchanged
        })
    }

    return <>

        <>
            <label className="block font-medium text-sm text-gray-700">Google link</label>
            <div className="flex items-center justify-between gap-2">
                <Input
                    name=""
                    id=""
                    value={googleId}
                    onChange={(e) => setGoogleId(e.target.value)}
                    className="w-full border rounded-xl px-3 py-2 text-sm p-4  bg-white/40 border-blue-100 text-gray-800 shadow
        placeholder-gray-600 focus:outline-none focus:border-[#4e6ef2] backdrop-blur"
                />

                <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleSave('google_id', googleId)}
                >
                    Save
                </Button>
            </div>
        </>
    </>
}
