import FeedbackCard from '../components/FeedbackCard';
import { useGet } from '../hooks/remote/useGet';
import Spinner from '../ui/Spinner';
import Card from '../ui/Card';
import { ClipboardList, Star, TriangleAlert } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSwipeNavigate } from '../hooks/custom/useSwipeNavigate';
import ErrorMessage from '../components/ErrorMessage';

export default function Dashboard() {
  const handlers = useSwipeNavigate({
    left: '/feedback'
  }, 'card')
  const { data: feedbacks, isPending, error } = useGet('feedbacks', 'feedbacks')

    if(error) return <ErrorMessage />
  if (isPending) return <Spinner />

  const totalFeedbacks = feedbacks.length
  const rateAverage = (feedbacks.reduce((sum, f) => sum + f.rate, 0) / feedbacks.length).toFixed(2);


  const alerts = feedbacks.filter(fb => fb.rate <= 2)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        // key={activeTab + filterRate + sortOrder}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="w-full"
      >
        <div {...handlers} className="relative z-10 space-y-8 max-w-2xl mx-auto">
          <div className="space-y-8">
            {/* Top Stats */}
            <Card title={'Total Feedbacks'} value={totalFeedbacks} icon={<ClipboardList color='blue' />} color='blue' />
            <Card title={'Rating Average'} value={rateAverage} icon={<Star color='yellow' />} color='yellow' />
            <Card title={'Low Ratings'} value={alerts.length} icon={<TriangleAlert color='red' />} color='red' />

            {/* Alerts */}
            {alerts.length > 0 && (
              <div className="bg-red-100 p-1 rounded-2xl shadow-md">
                {alerts.map((fb) => <FeedbackCard key={fb.id} feedback={fb} />)}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

