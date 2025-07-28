import FeedbackCard from '../components/FeedbackCard';
import { useGet } from '../hooks/remote/useGet';
import Spinner from '../ui/Spinner';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import { ClipboardList, Star, TriangleAlert } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSwipeNavigate } from '../hooks/custom/useSwipeNavigate';
import ErrorMessage from '../components/ErrorMessage';
import { FEEDBACK_LIMIT, FREE_TRIAL_LIMIT, IMAGES_LIMIT, shop_id, USERS_LIMIT } from '../constants/local';

export default function Dashboard() {
  const handlers = useSwipeNavigate({
    left: '/feedback'
  }, 'card')
  const { data: feedbacks, isPending, error } = useGet('feedbacks', 'feedbacks')
  const { data, isPending: isPendingShop, error: errorShop } = useGet('shops', {
    filters: [{ column: 'id', operator: 'eq', value: shop_id }],
  })

  if (error || errorShop) return <ErrorMessage />
  if (isPending || isPendingShop) return <Spinner />

  const totalFeedbacks = feedbacks.length
  const rateAverage = (feedbacks.reduce((sum, f) => sum + f.rate, 0) / feedbacks.length).toFixed(2);


  const alerts = feedbacks.filter(fb => fb.rate <= 2)

  const shop = data[0]
  const daysPassed = Math.floor((new Date() - new Date(shop.created_at)) / (1000 * 60 * 60 * 24));

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
          <ProgressBar progress={feedbacks.length} limit={FEEDBACK_LIMIT} title="Feedbacks" />
          <ProgressBar progress={shop.images} limit={IMAGES_LIMIT} title="Images" />
          <ProgressBar progress={shop.users} limit={USERS_LIMIT} title="Users" />
          {shop.status === 'free' && <ProgressBar progress={daysPassed} limit={FREE_TRIAL_LIMIT} title="Free trial" />}

        </div>
      </motion.div>
    </AnimatePresence>
  );
}

