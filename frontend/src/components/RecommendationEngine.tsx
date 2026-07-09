import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useRecommendationEngine } from '@/hooks/useRecommendationEngine'
import { AICoachPanel } from './AICoachPanel'
import { ApplyAllRecommendations } from './ApplyAllRecommendations'
import { RecommendationInsights } from './RecommendationInsights'
import { RecommendationList } from './RecommendationList'
import { RecommendationSummary } from './RecommendationSummary'

export function RecommendationEngine() {
  const { recommendations, summary, ranking, insights, coachSummary, isLoading, isApplying, applyRecommendation, applyAllRecommendations } = useRecommendationEngine()

  const appliedCount = useMemo(() => recommendations.filter((recommendation) => recommendation.applied).length, [recommendations])

  if (isLoading) {
    return (
      <div className="rounded-[28px] border border-slate-800/80 bg-slate-950/70 p-6 text-sm text-slate-400">
        Loading recommendation engine…
      </div>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
    >
      <RecommendationSummary summary={summary} />

      <AICoachPanel coachSummary={coachSummary} appliedCount={appliedCount} recommendations={recommendations} />

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-100">{ranking?.headline ?? 'Recommendations ranked by impact'}</p>
            <p className="text-sm text-slate-400">{ranking?.description ?? 'Prioritized by carbon reduction, savings, and ease of adoption.'}</p>
          </div>
          <div className="rounded-full border border-slate-800/80 bg-slate-900/70 px-3 py-1 text-sm text-slate-300">
            Focus: {ranking?.focusArea ?? 'Packaging and transport'}
          </div>
        </div>

        <ApplyAllRecommendations count={recommendations.length} isApplying={isApplying} onApply={applyAllRecommendations} />
      </div>

      <RecommendationInsights insights={insights} />
      <RecommendationList recommendations={recommendations} onApply={applyRecommendation} isApplying={isApplying} />
    </motion.section>
  )
}
