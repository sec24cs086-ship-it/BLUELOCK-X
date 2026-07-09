import { Sparkles } from 'lucide-react'

interface RecommendationReasonProps {
  reason: string
}

export function RecommendationReason({ reason }: RecommendationReasonProps) {
  return (
    <div className="flex items-start gap-2 rounded-2xl border border-emerald-500/15 bg-emerald-500/10 p-3 text-sm text-emerald-100">
      <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{reason}</span>
    </div>
  )
}
