import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function WorkspaceHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-4 rounded-[28px] border border-slate-800/80 bg-slate-950/70 p-6 shadow-[0_20px_60px_rgba(2,6,23,0.2)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">EcoLens AI</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-100">AI Workspace</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Review receipts, inspect parsed details, and explore carbon-conscious actions in one place.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="secondary">Share workspace</Button>
        <Button>Upload receipt</Button>
      </div>
    </motion.header>
  )
}
