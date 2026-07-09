import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface StateCardProps {
  title: string
  description: string
  icon?: ReactNode
  variant?: 'default' | 'warning' | 'danger' | 'success'
}

const variantStyles: Record<NonNullable<StateCardProps['variant']>, string> = {
  default: 'border-slate-800 bg-slate-950/80 text-slate-100',
  warning: 'border-orange-500/20 bg-orange-500/10 text-orange-200',
  danger: 'border-red-500/20 bg-red-500/10 text-red-200',
  success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-200',
}

export function StateCard({ title, description, icon, variant = 'default' }: StateCardProps) {
  return (
    <div className={cn('rounded-3xl border p-6 shadow-sm', variantStyles[variant])}>
      <div className="flex items-start gap-4">
        {icon ? <div className="mt-1">{icon}</div> : null}
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-slate-400">{description}</p>
        </div>
      </div>
    </div>
  )
}
