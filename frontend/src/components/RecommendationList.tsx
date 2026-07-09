import { motion } from 'framer-motion'
import type { Recommendation } from '@/types/recommendation.types'
import { RecommendationCard } from './RecommendationCard'

interface RecommendationListProps {
  recommendations: Recommendation[]
  onApply: (recommendationId: string) => void
  isApplying?: boolean
}

export function RecommendationList({ recommendations, onApply, isApplying = false }: RecommendationListProps) {
  return (
    <div className="space-y-3">
      {recommendations.map((recommendation, index) => (
        <motion.div
          key={recommendation.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.22 }}
        >
          <RecommendationCard recommendation={recommendation} onApply={onApply} isApplying={isApplying} />
        </motion.div>
      ))}
    </div>
  )
}
