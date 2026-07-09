import { motion } from 'framer-motion'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ApplyAllRecommendationsProps {
  onApply: () => void
  isApplying?: boolean
  count: number
}

export function ApplyAllRecommendations({ onApply, isApplying = false, count }: ApplyAllRecommendationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-slate-800/70 bg-slate-950/70 p-4"
    >
      <div>
        <p className="text-sm font-semibold text-slate-100">{count} recommendations ready</p>
        <p className="text-sm text-slate-400">Apply all ranked actions in one step to simulate the AI coach workflow.</p>
      </div>
      <Button variant="default" onClick={onApply} disabled={isApplying} className="gap-2">
        {isApplying ? <CheckCircle2 className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
        {isApplying ? 'Applied' : 'Apply all'}
      </Button>
    </motion.div>
  )
}
