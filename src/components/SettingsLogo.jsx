import { useState, useCallback } from 'react'
import Button from '../ui/Button'
import { useUpload } from '../hooks/remote/useUpload'

export default function ImageUploader({ shop, updateShop }) {
    const [file, setFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [isDragging, setIsDragging] = useState(false)

    const { uploading, uploadedUrl, error, upload } = useUpload('logos')

    const handleFile = (file) => {
        if (!file) return
        setFile(file)
        setPreviewUrl(URL.createObjectURL(file))
    }

    const handleFileSelect = (e) => {
        const selected = e.target.files[0]
        handleFile(selected)
    }

    const handleDrop = useCallback((e) => {
        e.preventDefault()
        setIsDragging(false)
        const droppedFile = e.dataTransfer.files[0]
        handleFile(droppedFile)
    }, [])

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => setIsDragging(false)
    console.log(shop.images_limit);

    const handleUdateLogo = async () => {
        if (file) {
            const url = await upload(file)
            updateShop({
                match: { id: localStorage.getItem("shop_id") },
                updates: { ...shop, logo: url, images_limit: shop.images_limit + 1 }, // ⬅️ keeps other values unchanged
            })
        }
    }
    return (<>
        <h1 className="block font-medium text-sm text-gray-700">Choose your Logo</h1>
        <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md border border-gray-100 space-y-6 transition-all duration-300">
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
          flex flex-col items-center justify-center w-full h-40 border-2 rounded-lg cursor-pointer
          transition-all duration-300
          ${isDragging
                        ? 'border-blue-500 bg-blue-50 animate-pulse'
                        : 'border-dashed border-gray-300 hover:border-blue-500'}
        `}
            >
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                />
                <label htmlFor="file-upload" className="text-gray-500 select-none">
                    {isDragging ? 'Drop it here 🚀' : 'Click or drag image here'}
                </label>
            </div>

            {previewUrl && (
                <div className="w-full flex flex-col items-center space-y-2">
                    <p className="text-sm text-gray-600">Preview:</p>
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-48 h-auto rounded-xl shadow-lg ring-1 ring-gray-200"
                    />
                </div>
            )}

            <Button
                onClick={handleUdateLogo}
                disabled={!file || uploading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition disabled:opacity-50"
            >
                {uploading ? 'Uploading...' : 'Upload Image'}
            </Button>

            {error && <p className="text-red-500 text-center text-sm">{error}</p>}

            {uploadedUrl && (
                <div className="text-center space-y-2">
                    <p className="text-green-600 font-medium">Upload successful! ✅</p>
                    <a
                        href={uploadedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm"
                    >
                        View Uploaded Image
                    </a>
                </div>
            )}
        </div>
    </>
    )
}
