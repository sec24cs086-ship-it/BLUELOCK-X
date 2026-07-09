import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface EcoScoreCardProps {
  score: number
}

export function EcoScoreCard({ score }: EcoScoreCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-[24px] border-slate-800/80 bg-slate-950/70 p-0">
        <CardHeader className="pb-3">
          <CardTitle>Eco Score</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="rounded-[20px] border border-emerald-500/20 bg-emerald-500/10 p-4">
            <p className="text-sm text-emerald-200">Overall environmental score</p>
            <p className="mt-2 text-4xl font-semibold text-slate-100">{score}</p>
            <p className="mt-2 text-sm text-slate-300">Based on carbon, water, and material intensity.</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
