import { type HTMLAttributes, forwardRef, useEffect } from 'react'
import { cn } from '@/utils/cn'
import { X } from 'lucide-react'

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  variant?: 'default' | 'success' | 'warning' | 'danger'
  onDismiss?: () => void
  duration?: number
}

const variantStyles: Record<NonNullable<ToastProps['variant']>, string> = {
  default: 'bg-slate-950/95 border border-slate-800 text-slate-100',
  success: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-200',
  warning: 'bg-orange-500/10 border border-orange-500/20 text-orange-200',
  danger: 'bg-red-500/10 border border-red-500/20 text-red-200',
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ title, description, variant = 'default', onDismiss, duration = 5000, className, ...props }, ref) => {
    useEffect(() => {
      if (!onDismiss) return
      const timer = window.setTimeout(onDismiss, duration)
      return () => window.clearTimeout(timer)
    }, [duration, onDismiss])

    return (
      <div
        ref={ref}
        className={cn('pointer-events-auto rounded-3xl border p-4 shadow-lg shadow-slate-950/40', variantStyles[variant], className)}
        {...props}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-semibold">{title}</div>
            {description ? <div className="mt-1 text-sm text-slate-400">{description}</div> : null}
          </div>
          {onDismiss ? (
            <button type="button" className="text-slate-400 transition hover:text-slate-100" onClick={onDismiss}>
              <X size={16} />
            </button>
          ) : null}
        </div>
      </div>
    )
  },
)
Toast.displayName = 'Toast'
