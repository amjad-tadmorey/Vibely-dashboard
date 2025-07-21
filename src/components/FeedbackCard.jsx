import { CalendarDays, MessageSquareText, Star, User } from "lucide-react";

const FeedbackCard = ({ feedback, isSelected, onSelect }) => {
    const { rate, content, created_at, customer_name } = feedback;

    return (
        <div
            className={`rounded-2xl mb-1 shadow-md bg-white/30 backdrop-blur-lg border border-white/20 p-4 transition-transform hover:scale-[1.01] duration-2001
                    ${isSelected ? 'border-blue-500 ring-2 ring-blue-400' : 'hover:ring-1 hover:ring-gray-300'}
                `}
            onClick={() => onSelect(feedback.id)}
            id={`feedback-${feedback.id}`}
        >
            {/* Rating Bar */}
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
    );
};

export default FeedbackCard;
