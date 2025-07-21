import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toPng } from "html-to-image";
import FeedbackCard from "../components/FeedbackCard";

export default function FeedbackPreviewPage() {
    const { state } = useLocation();
    const feedbacks = state?.feedbacks || [];
    const containerRef = useRef(null);
    const [images, setImages] = useState([]);
    const [generated, setGenerated] = useState(false);

    useEffect(() => {
        async function generatePNGs() {
            const nodes = Array.from(containerRef.current.children);
            const imagePromises = nodes.map((node) => toPng(node));
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
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Preview</h2>

            {/* Hidden DOM to capture cards as images */}
            {!generated && (
                <div className="absolute -z-10 opacity-0 pointer-events-none" ref={containerRef}>
                    {feedbacks.map((fb) => (
                        <FeedbackCard key={fb.id} feedback={fb} isSelected={false} />
                    ))}
                </div>
            )}

            {/* Show images after conversion */}
            {generated && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {images.map((src, i) => (
                        <img key={i} src={src} alt={`feedback-${i + 1}`} className="rounded-xl shadow" />
                    ))}
                </div>
            )}

            {images.length > 0 && (
                <div className="text-center mt-6">
                    <button
                        onClick={handleShare}
                        className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition absolute top-0"
                    >
                        Share
                    </button>
                </div>
            )}
        </div>
    );
}
