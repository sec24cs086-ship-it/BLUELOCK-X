import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

type UploadErrorProps = {
  message: string
  onRetry: () => void
}

export function UploadError({ message, onRetry }: UploadErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] border border-red-500/20 bg-red-500/10 p-6"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-red-500/20 p-3 text-red-300">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-100">Upload failed</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">{message}</p>
        </div>
      </div>

      <div className="mt-6">
        <Button type="button" onClick={onRetry}>
          Try again
        </Button>
      </div>
    </motion.div>
  )
}
