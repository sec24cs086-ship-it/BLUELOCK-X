import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AIInsightsPanelProps {
  insights: string[]
}

export function AIInsightsPanel({ insights }: AIInsightsPanelProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-[24px] border-slate-800/80 bg-slate-950/70 p-0">
        <CardHeader className="pb-3">
          <CardTitle>AI insights</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {insights.map((insight) => (
              <div key={insight} className="flex items-start gap-3 rounded-[16px] border border-emerald-500/20 bg-emerald-500/10 p-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                <p className="text-sm leading-6 text-slate-300">{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
