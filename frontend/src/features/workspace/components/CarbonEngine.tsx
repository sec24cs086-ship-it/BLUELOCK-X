import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCarbonEngine } from '@/features/workspace/hooks/useCarbonEngine'
import { CarbonBreakdown } from './CarbonBreakdown'
import { CarbonExplanation } from './CarbonExplanation'
import { CarbonGradeCard } from './CarbonGradeCard'
import { CarbonInsightPanel } from './CarbonInsightPanel'
import { CarbonPipeline } from './CarbonPipeline'
import { CarbonScoreGauge } from './CarbonScoreGauge'
import { CarbonSummary } from './CarbonSummary'

export function CarbonEngine() {
  const { products, breakdown, summary, isLoading } = useCarbonEngine()

  if (isLoading) {
    return (
      <Card className="rounded-[24px] border-slate-800/80 bg-slate-950/70 p-0">
        <CardContent className="p-6 text-sm text-slate-400">Loading carbon intelligence…</CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <CarbonPipeline />
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <CarbonSummary summary={summary} />
        <div className="space-y-4">
          <CarbonScoreGauge score={summary?.score ?? 0} label="Overall carbon score" />
          <CarbonGradeCard grade={summary?.grade ?? 'C'} score={summary?.score ?? 0} />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <CarbonBreakdown breakdown={breakdown} />
        <CarbonInsightPanel summary={summary?.summary ?? ''} flaggedProducts={summary?.flaggedProducts ?? 0} />
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="rounded-[24px] border-slate-800/80 bg-slate-950/70 p-0">
              <CardHeader className="pb-3">
                <CardTitle>{product.productName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-[16px] border border-slate-800/80 bg-slate-900/70 p-3">
                    <p className="text-slate-400">Category</p>
                    <p className="mt-1 font-medium text-slate-100">{product.category}</p>
                  </div>
                  <div className="rounded-[16px] border border-slate-800/80 bg-slate-900/70 p-3">
                    <p className="text-slate-400">Packaging</p>
                    <p className="mt-1 font-medium text-slate-100">{product.packagingType}</p>
                  </div>
                  <div className="rounded-[16px] border border-slate-800/80 bg-slate-900/70 p-3">
                    <p className="text-slate-400">Origin</p>
                    <p className="mt-1 font-medium text-slate-100">{product.origin}</p>
                  </div>
                  <div className="rounded-[16px] border border-slate-800/80 bg-slate-900/70 p-3">
                    <p className="text-slate-400">Estimated transport distance</p>
                    <p className="mt-1 font-medium text-slate-100">{product.transportDistanceKm} km</p>
                  </div>
                  <div className="rounded-[16px] border border-slate-800/80 bg-slate-900/70 p-3">
                    <p className="text-slate-400">Base emission</p>
                    <p className="mt-1 font-medium text-slate-100">{product.baseEmission.toFixed(2)} kg</p>
                  </div>
                  <div className="rounded-[16px] border border-slate-800/80 bg-slate-900/70 p-3">
                    <p className="text-slate-400">Packaging impact</p>
                    <p className="mt-1 font-medium text-slate-100">{product.packagingImpact.toFixed(2)} kg</p>
                  </div>
                  <div className="rounded-[16px] border border-slate-800/80 bg-slate-900/70 p-3">
                    <p className="text-slate-400">Transport impact</p>
                    <p className="mt-1 font-medium text-slate-100">{product.transportImpact.toFixed(2)} kg</p>
                  </div>
                  <div className="rounded-[16px] border border-slate-800/80 bg-slate-900/70 p-3">
                    <p className="text-slate-400">Storage impact</p>
                    <p className="mt-1 font-medium text-slate-100">{product.storageImpact.toFixed(2)} kg</p>
                  </div>
                  <div className="rounded-[16px] border border-slate-800/80 bg-slate-900/70 p-3">
                    <p className="text-slate-400">Total carbon score</p>
                    <p className="mt-1 font-medium text-slate-100">{product.totalCarbonScore.toFixed(2)} kg</p>
                  </div>
                  <div className="rounded-[16px] border border-slate-800/80 bg-slate-900/70 p-3">
                    <p className="text-slate-400">Confidence</p>
                    <p className="mt-1 font-medium text-slate-100">{product.confidence}%</p>
                  </div>
                </div>

                <CarbonExplanation product={product} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
