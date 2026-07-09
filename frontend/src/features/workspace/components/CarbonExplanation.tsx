import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CarbonResult } from '@/features/workspace/types/carbon.types'

type CarbonExplanationProps = {
  product: CarbonResult
}

export function CarbonExplanation({ product }: CarbonExplanationProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="rounded-[22px] border-slate-800/80 bg-slate-900/70 p-0">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Why this score?</CardTitle>
          <button type="button" className="text-sm text-slate-400" onClick={() => setExpanded((value) => !value)}>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-slate-300">{product.explanation}</p>
        {expanded ? (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-2">
            {product.breakdown.map((item) => (
              <div key={item.label} className="rounded-[16px] border border-slate-800/80 bg-slate-950/70 p-3 text-sm text-slate-300">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-slate-100">{item.label}</span>
                  <span>{item.value} {item.unit}</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
              </div>
            ))}
          </motion.div>
        ) : null}
      </CardContent>
    </Card>
  )
}
