import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface EnvironmentalStat {
  label: string
  value: string
  detail: string
}

interface EnvironmentalStatisticsProps {
  stats: EnvironmentalStat[]
}

export function EnvironmentalStatistics({ stats }: EnvironmentalStatisticsProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-[24px] border-slate-800/80 bg-slate-950/70 p-0">
        <CardHeader className="pb-3">
          <CardTitle>Environmental statistics</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[16px] border border-slate-800/70 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="mt-2 text-xl font-semibold text-slate-100">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-400">{stat.detail}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
