import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CarbonSummary as CarbonSummaryType } from '@/features/workspace/types/carbon.types'

type CarbonSummaryProps = {
  summary: CarbonSummaryType | null
}

export function CarbonSummary({ summary }: CarbonSummaryProps) {
  if (!summary) {
    return null
  }

  return (
    <Card className="rounded-[24px] border-slate-800/80 bg-slate-950/70 p-0">
      <CardHeader className="pb-3">
        <CardTitle>Carbon Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="rounded-[20px] border border-emerald-500/20 bg-emerald-500/10 p-4">
          <p className="text-sm text-emerald-200">Overall grade</p>
          <p className="mt-1 text-3xl font-semibold text-slate-100">{summary.grade}</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[18px] border border-slate-800/80 bg-slate-900/70 p-3">
            <p className="text-sm text-slate-400">Total emissions</p>
            <p className="mt-1 text-xl font-semibold text-slate-100">{summary.totalEmissionsKg.toFixed(2)} kg</p>
          </div>
          <div className="rounded-[18px] border border-slate-800/80 bg-slate-900/70 p-3">
            <p className="text-sm text-slate-400">Avg confidence</p>
            <p className="mt-1 text-xl font-semibold text-slate-100">{summary.averageConfidence}%</p>
          </div>
        </motion.div>

        <div className="rounded-[20px] border border-slate-800/80 bg-slate-900/70 p-4 text-sm text-slate-300">
          <p>{summary.summary}</p>
          <p className="mt-2 text-slate-400">High confidence items: {summary.highConfidenceCount} • Flagged products: {summary.flaggedProducts}</p>
        </div>
      </CardContent>
    </Card>
  )
}
