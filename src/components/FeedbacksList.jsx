import { CalendarDays, MessageSquareText, User } from 'lucide-react'
import FeedbackCard from './FeedbackCard'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeedbacksList({ feedbacks }) {
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();

    const handleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleToggleAll = () => {
        if (selected.length === feedbacks.length) {
            setSelected([]);
        } else {
            setSelected(feedbacks.map((f) => f.id));
        }
    };

    const selectedFeedbacks = feedbacks.filter((f) => selected.includes(f.id));
    const allSelected = selected.length === feedbacks.length;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Feedbacks</h2>
                <button
                    onClick={handleToggleAll}
                    className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md transition"
                >
                    {allSelected ? 'Deselect All' : 'Select All'}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {feedbacks.map((fb) => (
                    <FeedbackCard
                        key={fb.id}
                        feedback={fb}
                        isSelected={selected.includes(fb.id)}
                        onSelect={handleSelect}
                    />
                ))}
            </div>

            {selected.length > 0 && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() =>
                            navigate("/preview", { state: { feedbacks: selectedFeedbacks } })
                        }
                        className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition fixed top-4 right-4"
                    >
                        Done ({selected.length})
                    </button>
                </div>
            )}
        </div>
    )
}
