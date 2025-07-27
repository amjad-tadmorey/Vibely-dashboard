import { useEffect, useState, useRef } from 'react'
import QRCode from 'qrcode'
import { toPng } from 'html-to-image'
import { shop_id } from '../constants/local'
import { useGet } from '../hooks/remote/useGet'
import Spinner from '../ui/Spinner'
import Input from '../ui/Input'

export default function QR() {
    const url = `https://vibely-gamma-peach.vercel.app/?shop_id=${shop_id}`
    const { data, isPending } = useGet('shops', {
        filters: [{ column: 'id', operator: 'eq', value: shop_id }],
    })

    const [qrSrc, setQrSrc] = useState(null)
    const [width, setWidth] = useState(200)
    const [height, setHeight] = useState(200)
    const [extraText, setExtraText] = useState('')
    const [showLogo, setShowLogo] = useState(false)

    const ref = useRef()

    useEffect(() => {
        QRCode.toDataURL(url, { errorCorrectionLevel: 'H', margin: 2 }, (err, url) => {
            if (err) return console.error(err)
            setQrSrc(url)
        })
    }, [url])

    const handleDownload = async () => {
        if (!ref.current) return
        const dataUrl = await toPng(ref.current)
        const link = document.createElement('a')
        link.download = 'qr-download.png'
        link.href = dataUrl
        link.click()
    }

    if (isPending) return <Spinner />
    const shop = data[0]

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            <div className="flex flex-wrap gap-4 justify-center">
                <div className='flex items-center gap-4'>
                    <label className="flex flex-col text-sm">
                        Width:
                        <Input
                            type="number"
                            value={width}
                            onChange={(e) => setWidth(Number(e.target.value))}
                            className="border p-1 rounded w-24"
                        />
                    </label>
                    <label className="flex flex-col text-sm">
                        Height:
                        <Input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            className="border p-1 rounded w-24"
                        />
                    </label>
                </div>
                <div className='flex items-center gap-4'>
                    <label className="flex flex-col text-sm">
                        Extra Text:
                        <Input
                            type="text"
                            value={extraText}
                            onChange={(e) => setExtraText(e.target.value)}
                            placeholder=""
                            className="border p-1 rounded w-64"
                        />
                    </label>
                    <div className="flex items-center gap-4">
                        <span className="text-sm">Logo</span>
                        <button
                            onClick={() => setShowLogo(!showLogo)}
                            className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out 
      ${showLogo ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out 
        ${showLogo ? 'translate-x-5' : 'translate-x-0'}`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div
                ref={ref}
                className="bg-white p-6 rounded shadow-md flex flex-col items-center gap-3"
            >
                <h2 className="text-xl font-semibold">Scan Me</h2>
                {qrSrc && (
                    <img
                        src={qrSrc}
                        alt="QR Code"
                        style={{ width: `${width}px`, height: `${height}px` }}
                    />
                )}

                {showLogo && (
                    <img
                        src={shop.logo}
                        alt="Shop Logo"
                        className="w-20 h-20 object-contain mt-2"
                    />
                )}

                {extraText && <p className="text-2xl mt-2 font-semibold text-center" style={{ color: shop.color }}>{extraText}</p>}
            </div>

            <button
                onClick={handleDownload}
                className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
                Download Image
            </button>
        </div>
    )
}
