import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stages = [
  'Classification',
  'Emission Factors',
  'Packaging',
  'Transportation',
  'Regional Adjustment',
  'Final Carbon Score',
]

export function CarbonPipeline() {
  return (
    <Card className="rounded-[24px] border-slate-800/80 bg-slate-950/70 p-0">
      <CardHeader className="pb-3">
        <CardTitle>Carbon Calculation Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap items-center gap-2">
          {stages.map((stage, index) => (
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/70 px-3 py-2 text-sm text-slate-300"
            >
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>{stage}</span>
              {index < stages.length - 1 ? <ArrowRight className="h-4 w-4 text-slate-500" /> : null}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
