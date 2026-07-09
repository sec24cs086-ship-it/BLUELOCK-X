import { type ReactNode } from 'react'

interface RecommendationCardProps {
  title: string
  description: string
  impactLabel: string
  score: string
  action?: ReactNode
}

export function RecommendationCard({ title, description, impactLabel, score, action }: RecommendationCardProps) {
  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-950/75 p-6 shadow-[0_20px_40px_rgba(2,6,23,0.20)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-slate-100">{title}</p>
          <p className="mt-2 text-sm text-slate-400">{description}</p>
        </div>
        <div className="rounded-3xl bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">{impactLabel}</div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-3xl font-semibold text-slate-100">{score}</p>
        {action ? <div>{action}</div> : null}
      </div>
    </div>
  )
}
