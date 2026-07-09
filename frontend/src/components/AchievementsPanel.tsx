import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Achievement } from '@/types/dashboard.types'

interface AchievementsPanelProps {
  achievements: Achievement[]
}

export function AchievementsPanel({ achievements }: AchievementsPanelProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-[24px] border-slate-800/80 bg-slate-950/70 p-0">
        <CardHeader className="pb-3">
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-3 rounded-[16px] border border-slate-800/70 bg-slate-900/70 p-3">
                <div className={`rounded-2xl p-2 ${achievement.unlocked ? 'bg-emerald-500/10 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                  <Trophy className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-100">{achievement.title}</p>
                  <p className="text-sm text-slate-400">{achievement.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
