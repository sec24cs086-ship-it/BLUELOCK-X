import { motion } from 'framer-motion'
import { Camera, CloudUpload, FileImage } from 'lucide-react'
import { Button } from '@/components/ui/button'

type UploadEmptyStateProps = {
  isDragging: boolean
  onBrowse: () => void
  onCameraPlaceholder: () => void
}

export function UploadEmptyState({ isDragging, onBrowse, onCameraPlaceholder }: UploadEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] border border-dashed border-slate-700/80 bg-slate-900/70 p-6 text-center"
    >
      <motion.div
        animate={{ scale: isDragging ? 1.02 : 1, y: isDragging ? -3 : 0 }}
        transition={{ duration: 0.2 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300"
      >
        <CloudUpload className="h-8 w-8" />
      </motion.div>

      <h4 className="mt-4 text-lg font-semibold text-slate-100">Drop your receipt here</h4>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Drag and drop a receipt image or PDF. We will keep the experience mock-ready for now.
      </p>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Button type="button" onClick={onBrowse}>
          Browse Files
        </Button>
        <Button type="button" variant="outline" onClick={onCameraPlaceholder}>
          <Camera className="mr-2 h-4 w-4" />
          Camera Upload
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-400">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-950/70 px-3 py-1.5">
          <FileImage className="h-4 w-4 text-emerald-300" />
          PNG, JPG, JPEG, PDF
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-950/70 px-3 py-1.5">
          Max 10 MB
        </span>
      </div>
    </motion.div>
  )
}
