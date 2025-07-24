import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Table from '../ui/Table';
import FeedbackCard from '../components/FeedbackCard';
import { useGet } from '../hooks/remote/useGet';
import Spinner from '../ui/Spinner';
import Card from '../ui/Card';
import { ClipboardList, Star, TriangleAlert } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import CreateUser from '../temp/CreateUser';

const feedbacks = [
  { id: 1, rating: 5, comment: 'Great service!', created_at: '2025-07-21', status: 'new', customer: 'Ali' },
  { id: 2, rating: 4, comment: 'Good quality.', created_at: '2025-07-20', status: 'new', customer: 'Lina' },
  { id: 3, rating: 1, comment: 'Bad experience', created_at: '2025-07-19', status: 'new', customer: 'Sara' },
  { id: 4, rating: 5, comment: 'Loved it!', created_at: '2025-07-18', status: 'pinned', customer: 'Omar' },
];

const columns = [
  { header: 'Customer', accessor: 'customer' },
  { header: 'Rating', accessor: 'rating' },
  { header: 'Comment', accessor: 'comment' },
]

const data = [
  { customer: 'Ali', rating: 4, comment: 'Great service!' },
  { customer: 'Sara', rating: 5, comment: 'Loved it!' },
  { customer: 'John', rating: 2, comment: 'Not satisfied' },
]

export default function Dashboard() {
  const { data: feedbacks, isPending } = useGet('feedbacks', 'feedbacks')

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
        <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
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

            {/* Recent Feedbacks */}
            {/* <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">📝 Recent Feedbacks</h2>
          <ul className="space-y-4">
            {feedbacks.map(fb => (
              <li key={fb.id} className="border border-gray-200 p-4 rounded-xl bg-white hover:shadow transition">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-gray-800">{fb.customer}</div>
                  <div className="text-yellow-500 font-medium">⭐ {fb.rating}</div>
                </div>
                <div className="text-sm text-gray-600 mt-1">"{fb.comment}"</div>
              </li>
            ))}
          </ul>
        </div> */}

            {/* <div className="text-center pt-4">
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700 transition px-5 py-2 rounded-full shadow-md">
            📤 Export Data
          </Button>
        </div> */}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

