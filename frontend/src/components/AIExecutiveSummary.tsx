import { motion } from 'framer-motion'
import type { AnalysisSummaryPayload } from '@/types/analysis.types'

interface AIExecutiveSummaryProps {
  summary: AnalysisSummaryPayload | null
}

export function AIExecutiveSummary({ summary }: AIExecutiveSummaryProps) {
  if (!summary) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-slate-950 to-slate-900 p-5"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">AI executive summary</p>
      <p className="mt-3 text-sm leading-7 text-slate-300">{summary.executiveSummary}</p>
    </motion.div>
  )
}
