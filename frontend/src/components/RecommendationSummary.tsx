import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import type { RecommendationSummaryData } from '@/types/recommendation.types'

interface RecommendationSummaryProps {
  summary: RecommendationSummaryData | null
}

export function RecommendationSummary({ summary }: RecommendationSummaryProps) {
  if (!summary) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-slate-950 to-slate-900 p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-emerald-300">AI recommendation engine</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-100">Potential impact snapshot</h3>
        </div>
        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">
          <span className="mr-2 inline-flex items-center"><Sparkles className="h-4 w-4" /></span>
          Mocked insights
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-[18px] border border-slate-800/70 bg-slate-950/70 p-4">
          <p className="text-sm text-slate-400">Potential reduction</p>
          <p className="mt-2 text-2xl font-semibold text-slate-100">{summary.totalPotentialKg.toFixed(2)} kg</p>
        </div>
        <div className="rounded-[18px] border border-slate-800/70 bg-slate-950/70 p-4">
          <p className="text-sm text-slate-400">Annualized savings</p>
          <p className="mt-2 text-2xl font-semibold text-slate-100">{summary.estimatedAnnualSavings}</p>
        </div>
        <div className="rounded-[18px] border border-slate-800/70 bg-slate-950/70 p-4">
          <p className="text-sm text-slate-400">Confidence</p>
          <p className="mt-2 text-2xl font-semibold text-slate-100">{summary.averageConfidence}%</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-300">
        <span className="rounded-full bg-slate-900/80 px-3 py-1">Top priority: {summary.topPriority}</span>
        <span className="rounded-full bg-slate-900/80 px-3 py-1">{summary.coachMessage}</span>
        <span className="ml-auto inline-flex items-center gap-2 text-emerald-200">
          Explore actions <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </motion.div>
  )
}
