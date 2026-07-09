import { motion } from 'framer-motion'
import { BrainCircuit, Sparkles } from 'lucide-react'
import type { Recommendation } from '@/types/recommendation.types'

interface AICoachPanelProps {
  coachSummary: string
  appliedCount: number
  recommendations: Recommendation[]
}

export function AICoachPanel({ coachSummary, appliedCount, recommendations }: AICoachPanelProps) {
  const highestImpact = recommendations[0]
  const estimatedSavings = recommendations.reduce((sum, recommendation) => sum + recommendation.carbonSavingsKg, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] border border-slate-800/80 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-5"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-300">
          <BrainCircuit className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-100">AI Coach summary</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">{coachSummary}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-[16px] border border-slate-800/70 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">High-impact improvements</p>
          <p className="mt-2 text-lg font-semibold text-slate-100">{recommendations.filter((recommendation) => recommendation.priority === 'High').length}</p>
        </div>
        <div className="rounded-[16px] border border-slate-800/70 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">Estimated carbon reduction</p>
          <p className="mt-2 text-lg font-semibold text-emerald-300">{estimatedSavings.toFixed(2)} kg</p>
        </div>
        <div className="rounded-[16px] border border-slate-800/70 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">Best starting recommendation</p>
          <p className="mt-2 text-lg font-semibold text-slate-100">{highestImpact?.title ?? 'N/A'}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[16px] border border-slate-800/70 bg-slate-900/70 p-4 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-300" />
          <span>Confidence score is derived from the mocked recommendation engine.</span>
        </div>
        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-200">
          {appliedCount}/{recommendations.length} applied
        </div>
      </div>
    </motion.div>
  )
}
