import { motion } from 'framer-motion'
import { CheckCircle2, Clock3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { UploadResult } from '@/features/workspace/types/upload.types'

type UploadSuccessProps = {
  result: UploadResult
  onReset: () => void
}

export function UploadSuccess({ result, onReset }: UploadSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] border border-emerald-500/20 bg-emerald-500/10 p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-500/20 p-3 text-emerald-300">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-100">Receipt uploaded successfully</p>
            <p className="mt-1 text-sm text-slate-400">{result.message}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[20px] border border-slate-800/80 bg-slate-950/70 p-4 text-sm text-slate-300">
        <div className="flex items-center justify-between gap-3">
          <span>File</span>
          <span className="font-medium text-slate-100">{result.fileName}</span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span>Size</span>
          <span className="font-medium text-slate-100">{(result.size / (1024 * 1024)).toFixed(2)} MB</span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 text-slate-400">
          <span className="inline-flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            Uploaded
          </span>
          <span>{new Date(result.uploadedAt).toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="button" onClick={onReset}>
          Upload another receipt
        </Button>
        <Button type="button" variant="outline">
          Preview receipt
        </Button>
      </div>
    </motion.div>
  )
}
