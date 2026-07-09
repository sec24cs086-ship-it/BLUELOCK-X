import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const cards = [
  {
    title: 'Carbon Summary',
    description: 'View an at-a-glance snapshot of the receipt’s environmental impact.',
  },
  {
    title: 'Recommendations',
    description: 'Explore practical alternatives that can lower the footprint.',
  },
  {
    title: 'Activity Timeline',
    description: 'Track the workspace events that shaped the current analysis.',
  },
]

export function RightPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.06 }}
        >
          <Card className="rounded-[22px] border-slate-800/80 bg-slate-950/70 p-0">
            <CardHeader className="pb-3">
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm leading-6 text-slate-400">{card.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.section>
  )
}
