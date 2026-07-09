import { motion } from 'framer-motion'
import { useAnalysisSummary } from '@/hooks/useAnalysisSummary'
import { AIExecutiveSummary } from './AIExecutiveSummary'
import { AnalysisTimeline } from './AnalysisTimeline'
import { CarbonGradeCard } from './CarbonGradeCard'
import { EcoScoreCard } from './EcoScoreCard'
import { EnvironmentalImpactCard } from './EnvironmentalImpactCard'
import { ExportActions } from './ExportActions'
import { StartNewScanButton } from './StartNewScanButton'
import { StatisticsGrid } from './StatisticsGrid'
import { SummaryCards } from './SummaryCards'

export function AnalysisSummary() {
  const { summary, isLoading, saveAnalysis, exportAnalysis, statusMessage } = useAnalysisSummary()

  if (isLoading) {
    return <div className="rounded-[28px] border border-slate-800/80 bg-slate-950/70 p-6 text-sm text-slate-400">Loading analysis summary…</div>
  }

  if (!summary) {
    return null
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-emerald-300">Analysis summary</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-100">Executive sustainability overview</h3>
        </div>
        <StartNewScanButton />
      </div>

      <SummaryCards summary={summary} />
      <StatisticsGrid summary={summary} />

      <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4">
          <EcoScoreCard score={summary.ecoScore} />
          <CarbonGradeCard grade={summary.carbonGrade} score={summary.ecoScore} />
        </div>
        <div className="space-y-4">
          <EnvironmentalImpactCard summary={summary} />
          <AIExecutiveSummary summary={summary} />
        </div>
      </div>

      <AnalysisTimeline events={summary.timeline} />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-slate-800/80 bg-slate-950/70 p-4">
        <ExportActions onSave={saveAnalysis} onExport={exportAnalysis} />
        <span className="text-sm text-slate-400">{statusMessage}</span>
      </div>
    </motion.section>
  )
}
