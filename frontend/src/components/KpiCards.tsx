import { motion } from 'framer-motion'
import { ArrowUpRight, BadgeCheck, Leaf, Sparkles } from 'lucide-react'
import type { DashboardKpi } from '@/types/dashboard.types'

interface KpiCardsProps {
  kpis: DashboardKpi[]
}

export function KpiCards({ kpis }: KpiCardsProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi, index) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06 }}
          className="rounded-[20px] border border-slate-800/80 bg-slate-900/70 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-slate-400">{kpi.label}</p>
              <p className="mt-2 text-xl font-semibold text-slate-100">{kpi.value}</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-300">
              {kpi.label.includes('Eco') ? <Sparkles className="h-5 w-5" /> : kpi.label.includes('Carbon') || kpi.label.includes('receipts') ? <Leaf className="h-5 w-5" /> : <BadgeCheck className="h-5 w-5" />}
            </div>
          </div>
          <div className={`mt-4 inline-flex items-center gap-2 text-sm ${kpi.positive ? 'text-emerald-300' : 'text-rose-300'}`}>
            <ArrowUpRight className="h-4 w-4" />
            {kpi.change}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
