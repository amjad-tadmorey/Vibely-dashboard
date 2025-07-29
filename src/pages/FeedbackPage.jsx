import { useEffect, useState } from 'react';
import { useGet } from '../hooks/remote/useGet';
import Spinner from '../ui/Spinner';
import FeedbacksList from '../components/FeedbacksList';
import FeedbackFilters from '../components/FeedbackFilters';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeedbackNotification } from '../hooks/custom/useFeedbackNotification';
import { useSwipeNavigate } from '../hooks/custom/useSwipeNavigate';
import ErrorMessage from '../components/ErrorMessage';

export default function FeedbackPage() {
  const handlers = useSwipeNavigate(
    { right: '/', left: '/qr' },
    'card'
  )

  const { resetCount } = useFeedbackNotification();

  useEffect(() => {
    resetCount();
  }, []);

  const [filterRate, setFilterRate] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc");
  const [activeTab, setActiveTab] = useState("new");

  const { data: feedbacks = [], isPending, error } = useGet('feedbacks', 'feedbacks');


  if (error) return <ErrorMessage />

  const filteredFeedbacks = feedbacks
    .filter(fb => fb.status === activeTab)
    .filter(fb => filterRate === 0 || fb.rate === filterRate)
    .sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div {...handlers} className="space-y-4 relative">
      {/* Tabs */}
      <div className="flex justify-center mb-4">
        {["new", "handled"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-1/2 py-2 text-sm font-medium capitalize transition-all duration-300 ${activeTab === tab
              ? "border-b border-b-blue-500 text-blue-500"
              : "text-gray-700"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <FeedbackFilters
        filterRate={filterRate}
        setFilterRate={setFilterRate}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* List with Slide Animation */}
      {isPending ? (
        <Spinner />
      ) : (
        <div className="relative overflow-hidden min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + filterRate + sortOrder}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-full"
            >
              <FeedbacksList activeTab={activeTab} feedbacks={filteredFeedbacks} />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
