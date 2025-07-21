import { useEffect, useState } from 'react'
import { useGet } from '../hooks/remote/useGet'
import { supabase } from '../lib/supabase'
import Spinner from '../ui/Spinner'

import FeedbacksList from '../components/FeedbacksList'
import FeedbackFilters from '../components/FeedbackFilters'

export default function FeedbackPage() {
  const [filterRate, setFilterRate] = useState(0)
  const [sortOrder, setSortOrder] = useState("desc")

  const { data: feedbacks, isPending } = useGet('feedbacks', 'feedbacks')
  if (isPending) return <Spinner />

  const filteredFeedbacks = feedbacks
    .filter(fb => filterRate === 0 || fb.rate === filterRate)
    .sort((a, b) => {
      if (sortOrder === "asc") return new Date(a.created_at) - new Date(b.created_at)
      return new Date(b.created_at) - new Date(a.created_at)
    })


  return (
    <div className="">
      <FeedbackFilters
        filterRate={filterRate}
        setFilterRate={setFilterRate}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <FeedbacksList feedbacks={filteredFeedbacks} />
    </div>
  )
}
