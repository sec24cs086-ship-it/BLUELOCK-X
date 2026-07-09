import { motion } from 'framer-motion'
import { Loader2, UploadCloud } from 'lucide-react'

type UploadProgressProps = {
  fileName: string
  progress: number
}

export function UploadProgress({ fileName, progress }: UploadProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] border border-slate-800/80 bg-slate-900/70 p-6"
    >
      <div className="flex items-center gap-3 text-slate-100">
        <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-300">
          <UploadCloud className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold">Uploading receipt</p>
          <p className="text-sm text-slate-400">{fileName}</p>
        </div>
      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>Secure upload in progress</span>
        <span className="font-semibold text-slate-100">{progress}%</span>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
        <Loader2 className="h-4 w-4 animate-spin text-emerald-300" />
        <span>Preparing the receipt for the workspace preview.</span>
      </div>
    </motion.div>
  )
}
