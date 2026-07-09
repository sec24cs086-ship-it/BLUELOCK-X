import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'secondary'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const badgeStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-800 text-slate-100',
  success: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20',
  warning: 'bg-orange-500/15 text-orange-300 border border-orange-500/20',
  danger: 'bg-red-500/15 text-red-300 border border-red-500/20',
  secondary: 'bg-slate-900 text-slate-300 border border-slate-700',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant = 'default', ...props }, ref) => (
  <span ref={ref} className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]', badgeStyles[variant], className)} {...props} />
))
Badge.displayName = 'Badge'
