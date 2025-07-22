import { CalendarDays, MessageSquareText, User } from 'lucide-react'
import FeedbackCard from './FeedbackCard'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import NoData from '../ui/NoData';

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
    const allSelected = selected.length === feedbacks.length && feedbacks.length !== 0;

    return (
        <div className='px-2'>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Feedbacks</h2>

                <div className='flex gap-2'>
                    {selected.length > 0 && (
                        <Button
                            onClick={() =>
                                navigate("/preview", { state: { feedbacks: selectedFeedbacks } })
                            }
                            size='sm'
                        >
                            Done ({selected.length})
                        </Button>
                    )}
                    <Button
                        onClick={handleToggleAll}
                        size='sm'
                        variant='secondary'
                    >
                        {allSelected ? 'Deselect All' : 'Select All'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {feedbacks.length > 0 ?
                    feedbacks.map((fb) => (
                        <FeedbackCard
                            key={fb.id}
                            feedback={fb}
                            isSelected={selected.includes(fb.id)}
                            onSelect={handleSelect}
                        />
                    ))
                    : <NoData message='No feed back for this query'/>
                }
            </div>

        </div>
    )
}
