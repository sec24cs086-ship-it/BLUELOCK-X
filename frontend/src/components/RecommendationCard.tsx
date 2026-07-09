import { motion } from 'framer-motion'
import { CheckCircle2, Leaf, Sparkles, Waves, Trees } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Recommendation } from '@/types/recommendation.types'
import { RecommendationPriority } from './RecommendationPriority'
import { RecommendationReason } from './RecommendationReason'

interface RecommendationCardProps {
  recommendation: Recommendation
  onApply: (recommendationId: string) => void
  isApplying?: boolean
}

export function RecommendationCard({ recommendation, onApply, isApplying = false }: RecommendationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] border border-slate-800/80 bg-slate-950/75 p-5 shadow-[0_18px_40px_rgba(2,6,23,0.16)]"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
              Rank #{recommendation.rank ?? '-'}
            </span>
            <RecommendationPriority priority={recommendation.priority} />
            <span className="rounded-full border border-slate-800/80 bg-slate-900/70 px-2.5 py-1 text-xs text-slate-300">
              {recommendation.category}
            </span>
          </div>

          <div>
            <p className="text-lg font-semibold text-slate-100">{recommendation.title}</p>
            <p className="mt-1 text-sm text-slate-400">
              {recommendation.productName} → {recommendation.suggestedAlternative}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[16px] border border-slate-800/70 bg-slate-900/70 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Carbon</p>
              <p className="mt-1 text-lg font-semibold text-emerald-300">-{recommendation.carbonSavingsKg.toFixed(2)} kg</p>
            </div>
            <div className="rounded-[16px] border border-slate-800/70 bg-slate-900/70 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Cost</p>
              <p className="mt-1 text-lg font-semibold text-slate-100">{recommendation.costComparison}</p>
            </div>
            <div className="rounded-[16px] border border-slate-800/70 bg-slate-900/70 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Water</p>
              <p className="mt-1 flex items-center gap-2 text-lg font-semibold text-sky-300">
                <Waves className="h-4 w-4" />{recommendation.waterSavingsLiters}L
              </p>
            </div>
            <div className="rounded-[16px] border border-slate-800/70 bg-slate-900/70 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Trees</p>
              <p className="mt-1 flex items-center gap-2 text-lg font-semibold text-lime-300">
                <Trees className="h-4 w-4" />{recommendation.treeEquivalent.toFixed(1)}x
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-slate-400">
            <span className="rounded-full bg-slate-900/80 px-3 py-1">Confidence {recommendation.confidence}%</span>
            <span className="rounded-full bg-slate-900/80 px-3 py-1">Difficulty {recommendation.difficulty}</span>
            <span className="rounded-full bg-slate-900/80 px-3 py-1">Availability {recommendation.availability}</span>
            <span className="rounded-full bg-slate-900/80 px-3 py-1">Impact {recommendation.impactScore}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:min-w-[220px] lg:items-end">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
            <Leaf className="h-4 w-4" />
            {recommendation.applied ? 'Applied' : 'Ready to apply'}
          </div>
          <Button variant={recommendation.applied ? 'success' : 'default'} onClick={() => onApply(recommendation.id)} disabled={isApplying || recommendation.applied} className="w-full gap-2 lg:w-auto">
            {recommendation.applied ? <CheckCircle2 className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            {recommendation.applied ? 'Applied' : 'Apply'}
          </Button>
          <button type="button" onClick={() => setIsExpanded((value) => !value)} className="text-sm font-medium text-emerald-300">
            {isExpanded ? 'Hide explanation' : 'Show explanation'}
          </button>
        </div>
      </div>

      {isExpanded ? (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
          <RecommendationReason reason={recommendation.reason} />
          <div className="rounded-[18px] border border-slate-800/70 bg-slate-900/70 p-4 text-sm leading-6 text-slate-300">
            {recommendation.explanation}
          </div>
        </motion.div>
      ) : null}
    </motion.article>
  )
}
