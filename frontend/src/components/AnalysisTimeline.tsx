import { motion } from 'framer-motion'
import type { AnalysisTimelineEvent } from '@/types/analysis.types'

interface AnalysisTimelineProps {
  events: AnalysisTimelineEvent[]
}

export function AnalysisTimeline({ events }: AnalysisTimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] border border-slate-800/80 bg-slate-950/70 p-5"
    >
      <p className="text-sm font-semibold text-slate-100">Analysis timeline</p>
      <div className="mt-4 space-y-3">
        {events.map((event, index) => (
          <div key={`${event.title}-${event.timestamp}`} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
              {index < events.length - 1 ? <div className="mt-1 h-full w-px bg-slate-800" /> : null}
            </div>
            <div className="rounded-[16px] border border-slate-800/70 bg-slate-900/70 p-3 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-100">{event.title}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{event.timestamp}</p>
              </div>
              <p className="mt-2 text-sm text-slate-400">{event.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
