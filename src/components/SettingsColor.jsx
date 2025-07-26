import { useState } from "react";
import Button from "../ui/Button";
import toast from "react-hot-toast";

export default function SettingsColor({ shop, updateShop }) {
    const [colorHex, setColorHex] = useState();

    const handleSave = (field, value) => {
        if (!value) return toast.error('Missing value')

        updateShop({
            match: { id: localStorage.getItem("shop_id") },
            updates: { ...shop, [field]: value }, // ⬅️ keeps other values unchanged
        })
    }

    return <>
        <h1 className="block font-medium text-sm text-gray-700">Choose your main Color</h1>
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
    </>
}
