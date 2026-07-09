import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { RecentActivityItem } from '@/types/dashboard.types'

interface RecentActivityProps {
  items: RecentActivityItem[]
}

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-[24px] border-slate-800/80 bg-slate-950/70 p-0">
        <CardHeader className="pb-3">
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="rounded-[16px] border border-slate-800/70 bg-slate-900/70 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-100">{item.label}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{item.time}</p>
                </div>
                <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
