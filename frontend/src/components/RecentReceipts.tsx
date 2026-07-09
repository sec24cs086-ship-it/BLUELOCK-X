import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { RecentReceipt } from '@/types/dashboard.types'

interface RecentReceiptsProps {
  receipts: RecentReceipt[]
}

export function RecentReceipts({ receipts }: RecentReceiptsProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-[24px] border-slate-800/80 bg-slate-950/70 p-0">
        <CardHeader className="pb-3">
          <CardTitle>Recent receipts</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {receipts.map((receipt) => (
              <div key={receipt.id} className="flex items-center justify-between rounded-[16px] border border-slate-800/70 bg-slate-900/70 p-3">
                <div>
                  <p className="text-sm font-medium text-slate-100">{receipt.merchant}</p>
                  <p className="text-sm text-slate-400">{receipt.date} • {receipt.total}</p>
                </div>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">{receipt.impact}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
