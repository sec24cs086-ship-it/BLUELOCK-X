import { Loader2 } from 'lucide-react'

export function Spinner() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-800 bg-slate-950/80 text-slate-200 shadow-sm">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}
