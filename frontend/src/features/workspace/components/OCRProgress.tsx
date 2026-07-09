import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

type OCRProgressProps = {
  progress: number
  status: 'idle' | 'processing' | 'complete'
}

export function OCRProgress({ progress, status }: OCRProgressProps) {
  const radius = 48
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center rounded-[24px] border border-slate-800/80 bg-slate-900/70 p-5">
      <div className="relative flex h-32 w-32 items-center justify-center">
        <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
          <circle cx="60" cy="60" r={radius} stroke="rgba(148, 163, 184, 0.24)" strokeWidth="10" fill="none" />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            stroke="url(#ocrGradient)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.4 }}
            strokeDasharray={circumference}
          />
          <defs>
            <linearGradient id="ocrGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute text-center">
          <p className="text-3xl font-semibold text-slate-100">{progress}%</p>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{status}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
        <Sparkles className="h-4 w-4 text-emerald-300" />
        <span>Simulated OCR engine running</span>
      </div>
    </div>
  )
}
