import { motion } from 'framer-motion'
import type { OCRBoundingBox } from '@/features/workspace/types/ocr.types'

type OCRBoundingBoxesProps = {
  boxes: OCRBoundingBox[]
}

export function OCRBoundingBoxes({ boxes }: OCRBoundingBoxesProps) {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-slate-800/80 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] p-4">
      <div className="relative h-64 rounded-[20px] border border-slate-800/80 bg-slate-950/70">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
        {boxes.map((box) => (
          <motion.div
            key={box.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute rounded-lg border border-emerald-400/60 bg-emerald-400/10"
            style={{
              left: `${box.x}%`,
              top: `${box.y}%`,
              width: `${box.width}%`,
              height: `${box.height}%`,
            }}
          >
            <div className="absolute -top-2 left-2 rounded-full bg-emerald-400/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-950">
              {box.label}
            </div>
            <div className="absolute bottom-2 right-2 text-[10px] font-semibold text-emerald-300">
              {box.confidence}%
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
