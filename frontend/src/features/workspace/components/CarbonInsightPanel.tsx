import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type CarbonInsightPanelProps = {
  summary: string
  flaggedProducts: number
}

export function CarbonInsightPanel({ summary, flaggedProducts }: CarbonInsightPanelProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-[24px] border-slate-800/80 bg-slate-950/70 p-0">
        <CardHeader className="pb-3">
          <CardTitle>Carbon Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0 text-sm text-slate-300">
          <p>{summary}</p>
          <div className="rounded-[16px] border border-slate-800/80 bg-slate-900/70 p-3">
            <p className="text-slate-400">Flagged products</p>
            <p className="mt-1 text-xl font-semibold text-slate-100">{flaggedProducts}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
