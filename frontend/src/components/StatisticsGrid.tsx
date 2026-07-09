import { motion } from 'framer-motion'
import type { AnalysisSummaryPayload } from '@/types/analysis.types'

interface StatisticsGridProps {
  summary: AnalysisSummaryPayload | null
}

export function StatisticsGrid({ summary }: StatisticsGridProps) {
  if (!summary) {
    return null
  }

  const items = [
    { label: 'Product count', value: summary.productCount.toString() },
    { label: 'Recommendation count', value: summary.recommendationCount.toString() },
    { label: 'Potential carbon reduction', value: `${summary.potentialCarbonReduction.toFixed(2)} kg` },
    { label: 'Estimated cost saving', value: summary.estimatedCostSaving },
    { label: 'Average OCR confidence', value: `${summary.averageOcrConfidence}%` },
    { label: 'Processing time', value: summary.processingTime },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="rounded-[18px] border border-slate-800/80 bg-slate-900/70 p-4"
        >
          <p className="text-sm text-slate-400">{item.label}</p>
          <p className="mt-2 text-xl font-semibold text-slate-100">{item.value}</p>
        </motion.div>
      ))}
    </div>
  )
}
