import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toJpeg, toPng } from "html-to-image";
import FeedbackCard from "../components/FeedbackCard";
import Button from "../ui/Button";
import CubesSpinner from '../ui/CubeSpinner'
import { CalendarDays, MessageSquareText, Share, User } from "lucide-react";

export default function FeedbackPreviewPage() {
    const { state } = useLocation();
    const feedbacks = state?.feedbacks || [];
    const containerRef = useRef(null);
    const [images, setImages] = useState([]);
    const [generated, setGenerated] = useState(false);

    useEffect(() => {
        async function generatePNGs() {
            const nodes = Array.from(containerRef.current.children);
            const imagePromises = nodes.map((node) =>
                toPng(node, { backgroundColor: "white", quality: 1 })
            );
            const dataUrls = await Promise.all(imagePromises);
            setImages(dataUrls);
            setGenerated(true);
        }

        if (feedbacks.length && !generated) {
            setTimeout(generatePNGs, 300); // wait for DOM to render
        }
    }, [feedbacks, generated]);

    const handleShare = async () => {
        try {
            const files = await Promise.all(
                images.map(async (dataUrl, i) => {
                    const blob = await (await fetch(dataUrl)).blob();
                    return new File([blob], `feedback-${i + 1}.png`, { type: blob.type });
                })
            );

            const canShareFiles = navigator.canShare?.({ files });

            if (navigator.share && canShareFiles) {
                await navigator.share({
                    title: "Customer Feedback",
                    text: "Check out what our customers said!",
                    files,
                });
            } else if (navigator.share) {
                await navigator.share({
                    title: "Customer Feedback",
                    text: "Check out our feedback! " + window.location.href,
                });
            } else {
                alert("Sharing is not supported on this device.");
            }
        } catch (err) {
            console.error("Share failed", err);
        }
    };


    return (
        <div className="">

            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">Preview</h2>
                {
                    images.length > 0 && (
                        <Button
                            onClick={handleShare}
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <Share /> Share
                        </Button>
                    )
                }
            </div>

            {
                !generated && <CubesSpinner />
            }

            {/* Hidden DOM to capture cards as images */}
            {!generated && (
                <div className="absolute -z-10 opacity-0 pointer-events-none" ref={containerRef}>
                    {feedbacks.map((fb) => {
                        const { id, rate, content, created_at, customer_name } = fb;



                        return <div
                            key={fb.id}
                            className={
                                `m-1 mb-2 shadow-md bg-white/30 backdrop-blur-lg border border-white/20 p-4 transition-all duration-300 ease-in-out relative z-10`
                            }

                        >
                            {/* Rating */}
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <span key={i} className={i <= rate ? "text-yellow-400" : "text-gray-300"}>
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <User size={14} />
                                    {customer_name}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="text-gray-800 text-sm font-medium mb-3">
                                <MessageSquareText size={16} className="inline mr-1 text-gray-500" />
                                {content}
                            </div>

                            {/* Date */}
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                <CalendarDays size={14} />
                                {new Date(created_at).toLocaleDateString()}
                            </div>
                        </div>
                    })}
                </div>
            )}

            {/* Show images after conversion */}
            {generated && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {images.map((src, i) => (
                        <img key={i} src={src} alt={`feedback-${i + 1}`} className="" />
                    ))}
                </div>
            )}
        </div>
    );
}
