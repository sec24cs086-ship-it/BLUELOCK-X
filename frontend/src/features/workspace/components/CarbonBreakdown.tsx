import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CarbonBreakdown as CarbonBreakdownType } from '@/features/workspace/types/carbon.types'

type CarbonBreakdownProps = {
  breakdown: CarbonBreakdownType | null
}

export function CarbonBreakdown({ breakdown }: CarbonBreakdownProps) {
  if (!breakdown) {
    return null
  }

  return (
    <Card className="rounded-[24px] border-slate-800/80 bg-slate-950/70 p-0">
      <CardHeader className="pb-3">
        <CardTitle>Carbon Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="rounded-[20px] border border-slate-800/80 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">Total emissions</p>
          <p className="mt-1 text-3xl font-semibold text-slate-100">{breakdown.totalKg.toFixed(2)} kg</p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {breakdown.byCategory.map((item) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-[18px] border border-slate-800/80 bg-slate-900/70 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-slate-100">{item.label}</p>
                <p className="text-sm text-slate-300">{item.value}</p>
              </div>
              <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="rounded-[20px] border border-amber-500/20 bg-amber-500/10 p-4">
          <p className="text-sm font-semibold text-amber-200">Primary drivers</p>
          {breakdown.primaryDrivers.map((item) => (
            <div key={item.label} className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-300">
              <span>{item.label}</span>
              <span className="font-medium text-slate-100">{item.value} {item.unit}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
