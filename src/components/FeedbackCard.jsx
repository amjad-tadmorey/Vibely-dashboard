import { CalendarDays, MessageSquareText, User, Trash2, Archive } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import { useState } from "react";
import { useDelete } from '../hooks/remote/useDelete'
import { useUpdate } from "../hooks/remote/useUpdate";
import { AnimatePresence, motion } from 'framer-motion'

const FeedbackCard = ({ feedback, isSelected, onSelect, onMarkHandled }) => {
    const { id, rate, content, created_at, customer_name, status } = feedback;

    const [isSwiped, setIsSwiped] = useState(false);
    const [isDisappearing, setIsDisappearing] = useState(false)

    const { mutate: deleteFeedback } = useDelete('feedbacks', 'feedbacks');
    const { mutate: markAsHandled } = useUpdate('feedbacks', 'feedbacks');

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => setIsSwiped(true),
        onSwipedRight: () => setIsSwiped(false),
        preventScrollOnSwipe: true,
        trackTouch: true,
        trackMouse: false,
    });
    const handleDelete = () => {
        setIsDisappearing(true)
        setTimeout(() => {
            deleteFeedback({ id });
        }, 300);
    };


    const handleMarkAsHandled = () => {
        setIsDisappearing(true)
        setTimeout(() => {
            markAsHandled({
                match: { id },
                updates: { status: 'handled' },
            });
        }, 300);
    };


    return (
        <AnimatePresence>
            <motion.div
                layout // 👈 This line enables layout animation
                className="relative"
                exit={{ opacity: 0, scale: 0.9 }}
                initial={{ opacity: 1, scale: 1 }}
                animate={isDisappearing ? { opacity: 0, scale: 0.95 } : {}}
                transition={{ duration: 0.3 }}
            >
                <div className="card relative w-full overflow-hidden" {...swipeHandlers}>
                    {/* Action Buttons */}
                    <div
                        className={`absolute right-0 top-0 h-full flex gap-2 px-3 items-center transition-all duration-300 ease-in-out z-0
                    ${isSwiped ? 'translate-x-0 opacity-100 pop-animation' : 'translate-x-full opacity-0'}
                `}
                    >
                        <button className="text-red-600 hover:text-red-800 transition" title="Delete"
                            onClick={handleDelete}
                        >
                            <Trash2 />
                        </button>
                        {
                            status === 'new' && <button className="text-blue-600 hover:text-blue-800 transition" title="Pin"
                                onClick={handleMarkAsHandled}
                            >
                                <Archive />
                            </button>
                        }
                    </div>

                    {/* Main Card */}
                    <div
                        className={`m-1 rounded-2xl mb-2 shadow-md bg-white/30 backdrop-blur-lg border border-white/20 p-4 transition-all duration-300 ease-in-out
                    ${isSelected ? 'border-blue-500 ring-2 ring-blue-400' : 'hover:ring-1 hover:ring-gray-300'}
                    ${isSwiped ? '-translate-x-24' : 'translate-x-0'}
                    relative z-10
                `}
                        onClick={() => onSelect(feedback.id)}
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
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default FeedbackCard;
