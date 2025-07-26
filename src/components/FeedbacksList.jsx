import { Archive, Sparkles, Trash2 } from 'lucide-react'
import FeedbackCard from './FeedbackCard'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import NoData from '../ui/NoData';
import { useDelete } from '../hooks/remote/useDelete';
import { useUpdate } from '../hooks/remote/useUpdate';

export default function FeedbacksList({ feedbacks }) {
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();

    const { mutate: deleteFeedback } = useDelete('feedbacks', 'feedbacks');
    const { mutate: markAsHandled } = useUpdate('feedbacks', 'feedbacks');

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

    const handleDeleteNewFeedbacks = () => {
        selectedFeedbacks.map((fb) => {
            deleteFeedback({ id: fb.id });
        })
        setSelected([])
    };

    const handleMarkMultipleAsHandled = (ids) => {
        selectedFeedbacks.map((fb) => {
            markAsHandled({
                match: { id: fb.id },
                updates: { status: 'handled' },
            });
        })
        setSelected([])
    };

    return (
        <div className=''>
            <div className="flex justify-between items-center mb-4">
                {/* <h2 className="text-xl font-semibold">Feedbacks</h2> */}

                <div className='flex gap-4 ml-auto items-center'>
                    {selected.length > 0 && (
                        <>
                            <h1 className='font-semibold text-xl'>({selected.length})</h1>
                            <Button
                                onClick={() =>
                                    navigate("/preview", { state: { feedbacks: selectedFeedbacks } })
                                }
                                size='sm'
                                variant='success'
                            >
                                <Sparkles />
                            </Button>
                            <Button
                                onClick={handleDeleteNewFeedbacks}
                                size='sm'
                                variant='danger'
                            >
                                <Trash2 />
                            </Button>
                            <Button
                                onClick={handleMarkMultipleAsHandled}
                                size='sm'
                            >
                                <Archive />
                            </Button>
                        </>
                    )}
                    <Button
                        className='ml-auto'
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
                    : <NoData message='No feed back for this query' />
                }
            </div>

        </div>
    )
}
