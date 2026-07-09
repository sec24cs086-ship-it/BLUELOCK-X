import { Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('inline-flex items-center justify-center rounded-3xl bg-emerald-500/15 p-2 text-emerald-300', className)}>
      <Sparkles className="h-6 w-6" />
    </div>
  )
}
