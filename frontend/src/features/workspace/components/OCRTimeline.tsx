import { motion } from 'framer-motion'
import type { OCRStage } from '@/features/workspace/types/ocr.types'

type OCRTimelineProps = {
  stages: OCRStage[]
}

export function OCRTimeline({ stages }: OCRTimelineProps) {
  return (
    <div className="rounded-[24px] border border-slate-800/80 bg-slate-900/70 p-5">
      <div className="space-y-3">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: index * 0.08 }}
            className="rounded-[18px] border border-slate-800/80 bg-slate-950/70 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-100">{stage.label}</p>
                <p className="mt-1 text-sm text-slate-400">{stage.detail}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${stage.status === 'complete' ? 'bg-emerald-500/10 text-emerald-300' : stage.status === 'active' ? 'bg-sky-500/10 text-sky-300' : 'bg-slate-800 text-slate-400'}`}>
                {stage.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
