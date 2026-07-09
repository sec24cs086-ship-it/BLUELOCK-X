import { motion } from 'framer-motion'
import { Activity, Home, Package, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const items = [
  { label: 'Overview', icon: Home, active: true },
  { label: 'Receipts', icon: Package, active: false },
  { label: 'Insights', icon: Sparkles, active: false },
  { label: 'Activity', icon: Activity, active: false },
  { label: 'Security', icon: ShieldCheck, active: false },
]

export function WorkspaceSidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="h-full"
    >
      <Card className="h-full rounded-[24px] border-slate-800/80 bg-slate-950/70 p-4">
        <div className="space-y-2">
          {items.map(({ label, icon: Icon, active }) => (
            <Button
              key={label}
              variant={active ? 'default' : 'ghost'}
              className={`w-full justify-start gap-3 px-3 ${active ? '' : 'text-slate-300'}`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Button>
          ))}
        </div>
      </Card>
    </motion.aside>
  )
}
