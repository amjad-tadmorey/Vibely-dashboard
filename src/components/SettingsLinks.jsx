import { useState } from "react"
import Button from "../ui/Button"
import CardSocial from "../ui/CardSocial"
import Input from "../ui/Input"
import { platforms } from "../constants/local"

export default function SettingsLinks({ shop, updateShop }) {
    const { social } = shop
    const [platformName, setPlatformName] = useState('')
    const [link, setLink] = useState('')

    const handleAddSocial = (value) => {
        if (value.name === '' || value.link === '') return toast.error('Missing name or link')

        updateShop({
            match: { id: localStorage.getItem("shop_id") },
            updates: { ...shop, social: [...social, value] }, // ⬅️ keeps other values unchanged
        })
    }

    return <>
        <h1 className="block font-medium text-sm text-gray-700">Manage your Links</h1>

        <div className="space-y-2">
            {social.map(({ name, link }) => <CardSocial key={name} name={name} link={link} social={social} updateShop={updateShop} shop={shop} />)}
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
    </>
}
