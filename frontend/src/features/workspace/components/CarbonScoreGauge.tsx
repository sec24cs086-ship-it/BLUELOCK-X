import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

type CarbonScoreGaugeProps = {
  score: number
  label: string
}

export function CarbonScoreGauge({ score, label }: CarbonScoreGaugeProps) {
  const clampedScore = Math.max(0, Math.min(100, score))
  const circumference = 2 * Math.PI * 44
  const offset = circumference - (clampedScore / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-3 rounded-[22px] border border-slate-800/80 bg-slate-950/70 p-4">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <svg viewBox="0 0 120 120" className="h-28 w-28 -rotate-90">
          <circle cx="60" cy="60" r="44" strokeWidth="10" className="fill-none stroke-slate-800" />
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.6 }}
            cx="60"
            cy="60"
            r="44"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            className={cn('fill-none', clampedScore >= 85 ? 'stroke-emerald-400' : clampedScore >= 70 ? 'stroke-amber-400' : 'stroke-rose-400')}
          />
        </svg>
        <div className="absolute text-center">
          <p className="text-2xl font-semibold text-slate-100">{clampedScore}</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Score</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-100">{label}</p>
        <p className="text-xs text-slate-400">Transparent score based on mocked lifecycle factors</p>
      </div>
    </div>
  )
}
