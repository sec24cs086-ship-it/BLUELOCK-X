import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReceiptUpload } from './ReceiptUpload'

const cards = [
  {
    title: 'Receipt Preview',
    description: 'Inspect the scanned receipt layout and extracted details.',
  },
  {
    title: 'OCR Processing',
    description: 'Preview the parsing state without running any backend processing.',
  },
  {
    title: 'Detected Products',
    description: 'Review the detected purchase items and their categories.',
  },
]

export function CenterPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
    >
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <ReceiptUpload />
      </motion.div>

      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: (index + 1) * 0.06 }}
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
