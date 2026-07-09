import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CarbonGradeCardProps {
  grade: 'A' | 'B' | 'C' | 'D'
  score: number
}

const gradeStyles: Record<CarbonGradeCardProps['grade'], string> = {
  A: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
  B: 'border-sky-500/30 bg-sky-500/10 text-sky-200',
  C: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
  D: 'border-rose-500/30 bg-rose-500/10 text-rose-200',
}

export function CarbonGradeCard({ grade, score }: CarbonGradeCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-[24px] border-slate-800/80 bg-slate-950/70 p-0">
        <CardHeader className="pb-3">
          <CardTitle>Carbon Grade</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className={`rounded-[20px] border p-4 ${gradeStyles[grade]}`}>
            <p className="text-sm">Overall grade</p>
            <p className="mt-2 text-4xl font-semibold">{grade}</p>
            <p className="mt-2 text-sm opacity-90">Score {score}/100</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
