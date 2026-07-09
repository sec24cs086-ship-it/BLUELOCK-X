import { type ReactNode, type HTMLAttributes } from 'react'

interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: ReactNode
}

export function Tooltip({ content, children, className, ...props }: TooltipProps) {
  return (
    <div className={className} {...props}>
      {children}
      <div className="pointer-events-none absolute z-50 translate-y-1/2 rounded-xl bg-slate-950/95 px-3 py-2 text-sm text-slate-100 shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {content}
      </div>
    </div>
  )
}
