import { motion } from 'framer-motion'
import { BadgeCheck, Leaf, Sparkles, TrendingUp } from 'lucide-react'
import type { AnalysisSummaryPayload } from '@/types/analysis.types'

interface SummaryCardsProps {
  summary: AnalysisSummaryPayload | null
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  if (!summary) {
    return null
  }

  const cards = [
    { label: 'Carbon footprint', value: summary.carbonFootprint, icon: Leaf },
    { label: 'Eco score', value: `${summary.ecoScore}/100`, icon: Sparkles },
    { label: 'Carbon grade', value: summary.carbonGrade, icon: BadgeCheck },
    { label: 'Confidence score', value: `${summary.confidence}%`, icon: TrendingUp },
  ]

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-[20px] border border-slate-800/80 bg-slate-900/70 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">{card.label}</p>
                <p className="mt-2 text-xl font-semibold text-slate-100">{card.value}</p>
              </div>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-300">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
