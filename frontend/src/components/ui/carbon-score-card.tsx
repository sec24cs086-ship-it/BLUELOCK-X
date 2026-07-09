import { type ReactNode } from 'react'

interface CarbonScoreCardProps {
  score: string
  trend: string
  details: string
  icon?: ReactNode
}

export function CarbonScoreCard({ score, trend, details, icon }: CarbonScoreCardProps) {
  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-950/80 p-6 shadow-[0_20px_40px_rgba(2,6,23,0.22)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Carbon Score</p>
          <p className="mt-3 text-4xl font-semibold text-slate-100">{score}</p>
        </div>
        {icon ? <div className="rounded-3xl bg-slate-900/90 p-3 text-emerald-300">{icon}</div> : null}
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 text-sm text-slate-400">
        <span>{trend}</span>
        <span>{details}</span>
      </div>
    </div>
  )
}
