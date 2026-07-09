import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useOCRProcessing } from '@/features/workspace/hooks/useOCRProcessing'
import { OCRBoundingBoxes } from './OCRBoundingBoxes'
import { OCRProgress } from './OCRProgress'
import { OCRStatistics } from './OCRStatistics'
import { OCRTimeline } from './OCRTimeline'

export function OCRProcessing() {
  const state = useOCRProcessing()

  return (
    <Card className="rounded-[24px] border-slate-800/80 bg-slate-950/70 p-0">
      <CardHeader className="pb-3">
        <CardTitle>OCR Processing</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-4 lg:grid-cols-[0.45fr_0.55fr]">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <OCRProgress progress={state.progress} status={state.status} />
            <OCRTimeline stages={state.stages} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {state.result ? (
              <>
                <OCRBoundingBoxes boxes={state.result.boxes} />
                <OCRStatistics statistics={state.result.statistics} />
              </>
            ) : (
              <div className="rounded-[24px] border border-slate-800/80 bg-slate-900/70 p-5 text-sm leading-6 text-slate-400">
                Waiting for the simulated OCR engine to complete the receipt scan.
              </div>
            )}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
