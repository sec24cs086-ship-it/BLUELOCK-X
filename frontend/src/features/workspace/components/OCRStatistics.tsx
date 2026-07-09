import { motion } from 'framer-motion'
import { ScanLine, TimerReset, TrendingUp } from 'lucide-react'
import type { OCRMetrics } from '@/features/workspace/types/ocr.types'

type OCRStatisticsProps = {
  statistics: OCRMetrics
}

export function OCRStatistics({ statistics }: OCRStatisticsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-[20px] border border-slate-800/80 bg-slate-900/70 p-4">
        <div className="flex items-center gap-2 text-emerald-300">
          <ScanLine className="h-4 w-4" />
          <span className="text-sm font-semibold">Lines</span>
        </div>
        <p className="mt-3 text-2xl font-semibold text-slate-100">{statistics.linesDetected}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-[20px] border border-slate-800/80 bg-slate-900/70 p-4">
        <div className="flex items-center gap-2 text-emerald-300">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-semibold">Words</span>
        </div>
        <p className="mt-3 text-2xl font-semibold text-slate-100">{statistics.wordsDetected}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-[20px] border border-slate-800/80 bg-slate-900/70 p-4">
        <div className="flex items-center gap-2 text-emerald-300">
          <TimerReset className="h-4 w-4" />
          <span className="text-sm font-semibold">Timing</span>
        </div>
        <p className="mt-3 text-2xl font-semibold text-slate-100">{statistics.processingTimeMs} ms</p>
      </motion.div>
    </div>
  )
}
