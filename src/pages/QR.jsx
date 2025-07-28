import { useEffect, useState, useRef } from 'react'
import QRCode from 'qrcode'
import { toPng } from 'html-to-image'
import { shop_id } from '../constants/local'
import { useGet } from '../hooks/remote/useGet'
import Spinner from '../ui/Spinner'
import { useSwipeNavigate } from "../hooks/custom/useSwipeNavigate"
import Input from '../ui/Input'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, LucideRuler, Share, Share2, Square } from 'lucide-react'
import Button from '../ui/Button'
import ErrorMessage from '../components/ErrorMessage'

export default function QR() {
    const handlers = useSwipeNavigate({
        right: '/feedback',
        left: '/settings',
    })

    const url = `https://vibely-gamma-peach.vercel.app/?shop_id=${shop_id}`
    const { data, isPending, error } = useGet('shops', {
        filters: [{ column: 'id', operator: 'eq', value: shop_id }],
    })

    const [qrSrc, setQrSrc] = useState(null)
    const presetSizes = {
        small: { label: '60 x 60', width: 60, height: 60, icon: <Square size={15} /> },
        medium: { label: '120 x 120', width: 120, height: 120, icon: <Square size={20} /> },
        large: { label: '200 x 200', width: 200, height: 200, icon: <Square size={25} /> },
        custom: { label: 'Custom', icon: <LucideRuler /> }
    };
    const [sizeOption, setSizeOption] = useState('medium');
    const [width, setWidth] = useState(120)
    const [height, setHeight] = useState(120)
    const [extraText, setExtraText] = useState('')
    const [showLogo, setShowLogo] = useState(false)

    const ref = useRef()

    useEffect(() => {
        QRCode.toDataURL(url, { errorCorrectionLevel: 'H', margin: 2 }, (err, url) => {
            if (err) return console.error(err)
            setQrSrc(url)
        })
    }, [url])


    const handleSizeChange = (option) => {
        setSizeOption(option);
        if (option !== 'custom') {
            const { width, height } = presetSizes[option];
            setWidth(width);
            setHeight(height);
        }
    }

    const waitForImagesToLoadAndPaint = (element) => {
        const images = Array.from(element.querySelectorAll("img"));

        return Promise.all(
            images.map((img) => {
                return new Promise((resolve) => {
                    const testImg = new Image();
                    testImg.crossOrigin = "anonymous"; // Required for Supabase or any external URL
                    testImg.src = img.src;

                    testImg.onload = () => requestAnimationFrame(resolve);
                    testImg.onerror = resolve; // Resolve anyway on error
                });
            })
        );
    };

    const handleDownload = async () => {
        if (!ref.current) return;

        await waitForImagesToLoadAndPaint(ref.current); // ✅ wait for logo to fully render

        const dataUrl = await toPng(ref.current);
        const link = document.createElement("a");
        link.download = "qr-download.png";
        link.href = dataUrl;
        link.click();
    };

    const handleShare = async () => {
        if (!ref.current) return;

        try {
            await waitForImagesToLoadAndPaint(ref.current); // ✅ wait before capturing

            const dataUrl = await toPng(ref.current);
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], "qr-share.png", { type: blob.type });

            const canShareFiles = navigator.canShare?.({ files: [file] });

            if (navigator.share && canShareFiles) {
                await navigator.share({
                    title: "QR Code",
                    text: "Check out this QR code!",
                    files: [file],
                });
            } else if (navigator.share) {
                await navigator.share({
                    title: "QR Code",
                    text: "Check it out! " + window.location.href,
                });
            } else {
                alert("Sharing is not supported on this device.");
            }
        } catch (err) {
            console.error("Share failed", err);
            alert("Something went wrong while sharing.");
        }
    };

    if (isPending) return <Spinner />
    if (error) return <ErrorMessage />
    const shop = data[0]

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full"
            >
                <div {...handlers} className="flex flex-col items-center gap-6 p-6 transition-all">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-1 flex-wrap">
                                {Object.entries(presetSizes).map(([key, { label, icon }]) => (
                                    <button
                                        key={key}
                                        onClick={() => handleSizeChange(key)}
                                        className={`transition-all rounded-lg flex flex-col items-center justify-between p-1 ${sizeOption === key ? 'bg-[#6EC1F6] text-white' : 'bg-white text-gray-700'
                                            } hover:border-[#6EC1F6]`}
                                    >
                                        <span>{icon}</span>
                                        <span>{label}</span>
                                    </button>
                                ))}
                            </div>

                            {sizeOption === 'custom' && (
                                <div className="flex items-center gap-4">
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
                            )}
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
                        className="transition-all bg-white p-6 rounded shadow-md flex flex-col items-center gap-3"
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
                                crossOrigin="anonymous" // 🔥 Important for capturing!
                                className="w-20 h-20 object-contain mt-2"
                            />
                        )}

                        {extraText && <p className="text-2xl mt-2 font-semibold text-center" style={{ color: shop.color }}>{extraText}</p>}
                    </div>

                    <div className='flex items-center gap-4'>
                        <Button
                            onClick={handleDownload}
                        >
                            <Download />
                        </Button>
                        <Button
                            onClick={handleShare}
                        >
                            <Share2 />
                        </Button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
