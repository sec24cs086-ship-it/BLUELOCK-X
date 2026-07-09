import { type HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number
}

export function Progress({ className, value, ...props }: ProgressProps) {
  const percent = Math.max(0, Math.min(100, value))

  return (
    <div className={cn('rounded-2xl bg-slate-900/80 p-1 shadow-inner', className)} {...props}>
      <div
        className="h-2.5 rounded-xl bg-emerald-500 transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
