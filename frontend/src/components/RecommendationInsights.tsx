import { motion } from 'framer-motion'
import type { RecommendationInsight } from '@/types/recommendation.types'

interface RecommendationInsightsProps {
  insights: RecommendationInsight[]
}

export function RecommendationInsights({ insights }: RecommendationInsightsProps) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {insights.map((insight, index) => (
        <motion.div
          key={insight.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 * index, duration: 0.25 }}
          className="rounded-[18px] border border-slate-800/80 bg-slate-900/70 p-4"
        >
          <p className="text-sm font-semibold text-slate-100">{insight.label}</p>
          <p className="mt-2 text-lg font-semibold text-emerald-300">{insight.value}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">{insight.detail}</p>
        </motion.div>
      ))}
    </div>
  )
}
