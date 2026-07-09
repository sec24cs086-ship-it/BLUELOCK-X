import { type ReactNode } from 'react'

interface InsightCardProps {
  title: string
  content: string
  badge?: string
  icon?: ReactNode
}

export function InsightCard({ title, content, badge, icon }: InsightCardProps) {
  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-950/75 p-6 shadow-[0_20px_40px_rgba(2,6,23,0.20)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-100">{title}</p>
          <p className="mt-3 text-sm text-slate-400">{content}</p>
        </div>
        {icon ? <div className="rounded-3xl bg-slate-900/90 p-3 text-emerald-300">{icon}</div> : null}
      </div>
      {badge ? <div className="mt-5 inline-flex rounded-full bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-400">{badge}</div> : null}
    </div>
  )
}
