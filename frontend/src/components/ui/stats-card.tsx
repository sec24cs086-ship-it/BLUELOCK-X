import { type ReactNode } from 'react'

interface StatsCardProps {
  title: string
  value: string
  description?: string
  icon?: ReactNode
}

export function StatsCard({ title, value, description, icon }: StatsCardProps) {
  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-950/75 p-6 shadow-[0_25px_60px_rgba(2,6,23,0.24)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-100">{value}</p>
        </div>
        {icon ? <div className="rounded-3xl bg-slate-900/90 p-3 text-emerald-300">{icon}</div> : null}
      </div>
      {description ? <p className="mt-4 text-sm text-slate-400">{description}</p> : null}
    </div>
  )
}
