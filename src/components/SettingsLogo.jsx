import { useState, useCallback } from 'react'
import Button from '../ui/Button'
import Spinner from '../ui/Spinner'
import { useUpload } from '../hooks/remote/useUpload'
import { useImages } from '../hooks/remote/useImages'

export default function ImageUploader({ shop, updateShop }) {
    const [file, setFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [isNewUpload, setIsNewUpload] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    const { uploading, uploadedUrl, error, upload } = useUpload('logos')
    const { data: images, isPending, refetch } = useImages()

    const handleFile = (file) => {
        if (!file) return
        setFile(file)
        setSelectedImage(null) // clear selected image if new file chosen
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

    const handleUdateLogo = async () => {
        let logoUrl = selectedImage

        if (file) {
            logoUrl = await upload(file)
            refetch() // refresh Supabase images after uploading
        }

        if (logoUrl) {
            updateShop({
                match: { id: localStorage.getItem("shop_id") },
                updates: {
                    ...shop,
                    logo: logoUrl,
                    images: isNewUpload ? shop.images : shop.images + 1,
                },
            })
            setIsNewUpload(false)
        }
    }

    if (isPending) return <Spinner />

    return (
        <>
            <h1 className="block font-medium text-sm text-gray-700 mb-2">Choose your Logo</h1>

            <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md border border-gray-100 space-y-6 transition-all duration-300">
                {/* Upload Dropzone */}
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

                {/* Preview */}
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

                {/* Existing Image Selector */}
                {images?.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Or select from existing:</p>
                        <div className="grid grid-cols-3 gap-3">
                            {images.map((url, i) => (
                                <img
                                    key={i}
                                    src={url}
                                    onClick={() => {
                                        setSelectedImage(url)
                                        setPreviewUrl(null)
                                        setFile(null)
                                        setIsNewUpload(true)
                                    }}
                                    className={`
                                        cursor-pointer w-full h-auto rounded-lg shadow-sm border-2
                                        ${selectedImage === url ? 'border-green-500' : 'border-transparent'}
                                        hover:border-blue-400 transition
                                    `}
                                    alt={`Image ${i}`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Upload/Use Selected Button */}
                <Button
                    onClick={handleUdateLogo}
                    disabled={(!file && !selectedImage) || uploading}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition disabled:opacity-50"
                >
                    {uploading ? 'Uploading...' : 'Save Logo'}
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
