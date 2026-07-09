import { motion } from 'framer-motion'
import type { AnalysisSummaryPayload } from '@/types/analysis.types'

interface EnvironmentalImpactCardProps {
  summary: AnalysisSummaryPayload | null
}

export function EnvironmentalImpactCard({ summary }: EnvironmentalImpactCardProps) {
  if (!summary) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] border border-slate-800/80 bg-slate-950/70 p-5"
    >
      <p className="text-sm font-semibold text-slate-100">Environmental equivalents</p>
      <div className="mt-4 space-y-3">
        {summary.environmentalEquivalents.map((equivalent) => (
          <div key={equivalent.label} className="rounded-[16px] border border-slate-800/70 bg-slate-900/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-100">{equivalent.label}</p>
              <p className="text-sm font-semibold text-emerald-300">{equivalent.value}</p>
            </div>
            <p className="mt-2 text-sm text-slate-400">{equivalent.detail}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
