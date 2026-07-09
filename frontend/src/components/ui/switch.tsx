import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export type SwitchProps = InputHTMLAttributes<HTMLInputElement>

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({ className, ...props }, ref) => (
  <label className={cn('inline-flex cursor-pointer items-center gap-2')}>
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        'peer sr-only',
        className,
      )}
      {...props}
    />
    <span className="inline-flex h-7 w-12 items-center rounded-full border border-slate-800 bg-slate-800/40 p-1 transition-colors duration-200 peer-checked:bg-emerald-500">
      <span className="inline-block h-5 w-5 translate-x-0 transform rounded-full bg-slate-950 shadow-sm transition duration-200 peer-checked:translate-x-5" />
    </span>
  </label>
))
Switch.displayName = 'Switch'
