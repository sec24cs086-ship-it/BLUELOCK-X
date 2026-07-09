import { type HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface ConfidenceIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  confidence: number
}

export function ConfidenceIndicator({ confidence, className, ...props }: ConfidenceIndicatorProps) {
  const clamped = Math.max(0, Math.min(100, confidence))
  const color = clamped > 75 ? 'bg-emerald-500' : clamped > 50 ? 'bg-amber-400' : 'bg-red-500'

  return (
    <div className={cn('min-w-[140px] rounded-2xl bg-slate-900/80 p-4 shadow-sm', className)} {...props}>
      <div className="flex items-center justify-between gap-2 text-sm text-slate-400">
        <span>Confidence</span>
        <span className="font-semibold text-slate-100">{clamped}%</span>
      </div>
      <div className="mt-3 h-2.5 rounded-full bg-slate-800">
        <div className={cn('h-full rounded-full transition-all duration-300', color)} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  )
}
