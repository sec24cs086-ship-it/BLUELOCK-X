import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface DashboardHeaderProps {
  title?: string
  description?: string
}

export function DashboardHeader({ title = 'Sustainability dashboard', description = 'A premium summary of your receipt-driven climate progress.' }: DashboardHeaderProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-start justify-between gap-3 rounded-[24px] border border-slate-800/80 bg-slate-950/70 p-6">
      <div>
        <div className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-emerald-300">
          <Sparkles className="h-4 w-4" />
          EcoLens analytics
        </div>
        <h2 className="mt-3 text-2xl font-semibold text-slate-100">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">{description}</p>
      </div>
    </motion.div>
  )
}
