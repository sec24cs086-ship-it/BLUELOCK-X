import { motion } from 'framer-motion'
import { Download, Save, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ExportActionsProps {
  onSave: () => void
  onExport: () => void
}

export function ExportActions({ onSave, onExport }: ExportActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-3"
    >
      <Button variant="secondary" className="gap-2" onClick={onExport}>
        <Download className="h-4 w-4" />
        Download report
      </Button>
      <Button variant="default" className="gap-2" onClick={onSave}>
        <Save className="h-4 w-4" />
        Save analysis
      </Button>
      <Button variant="outline" className="gap-2" disabled>
        <Share2 className="h-4 w-4" />
        Share report
      </Button>
    </motion.div>
  )
}
