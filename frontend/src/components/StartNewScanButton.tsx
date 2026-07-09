import { motion } from 'framer-motion'
import { ScanLine } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StartNewScanButtonProps {
  onStartNewScan?: () => void
}

export function StartNewScanButton({ onStartNewScan }: StartNewScanButtonProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Button variant="default" className="gap-2" onClick={onStartNewScan}>
        <ScanLine className="h-4 w-4" />
        Start new scan
      </Button>
    </motion.div>
  )
}
