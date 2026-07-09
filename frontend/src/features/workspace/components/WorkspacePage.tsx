import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, CloudUpload, Loader2, ScanLine, Sparkles, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useWorkspaceAnalysis } from '@/features/workspace/hooks/useWorkspaceAnalysis'
import type { ReceiptAnalysisData } from '@/features/workspace/types'

function WorkspaceSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-48 animate-pulse rounded-[28px] border border-slate-800/80 bg-slate-900/70" />
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="h-80 animate-pulse rounded-[28px] border border-slate-800/80 bg-slate-900/70" />
        <div className="h-80 animate-pulse rounded-[28px] border border-slate-800/80 bg-slate-900/70" />
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-[32px] border border-dashed border-slate-700 bg-slate-950/60 p-10 text-center">
      <CloudUpload className="mx-auto h-10 w-10 text-emerald-300" />
      <h3 className="mt-4 text-xl font-semibold text-slate-100">No receipt uploaded yet</h3>
      <p className="mt-2 text-sm text-slate-400">Drag a receipt into the workspace to begin the mock AI workflow.</p>
    </div>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-[32px] border border-red-500/20 bg-red-500/10 p-10 text-center">
      <AlertCircle className="mx-auto h-10 w-10 text-red-300" />
      <h3 className="mt-4 text-xl font-semibold text-slate-100">Analysis unavailable</h3>
      <p className="mt-2 text-sm text-red-200">{message}</p>
    </div>
  )
}

function UploadPanel({ analysis }: { analysis: ReceiptAnalysisData }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-800/80 bg-slate-950/70 p-6 shadow-[0_30px_90px_rgba(2,6,23,0.2)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-emerald-300">Receipt Upload</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-100">{analysis.merchant}</h2>
          <p className="mt-2 text-sm text-slate-400">{analysis.merchantAddress} • {analysis.date}</p>
        </div>
        <Badge variant="success">Ready to save</Badge>
      </div>

      <div className="mt-6 rounded-[28px] border border-slate-800/80 bg-slate-900/70 p-5">
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>Upload progress</span>
          <span className="font-semibold text-slate-100">{analysis.uploadProgress}%</span>
        </div>
        <Progress value={analysis.uploadProgress} className="mt-3" />
        <div className="mt-6 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[24px] border border-slate-800/80 bg-slate-950/70 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
              <CloudUpload className="h-4 w-4 text-emerald-300" />
              Drag & drop upload
            </div>
            <p className="mt-2 text-sm text-slate-400">Upload a PDF or image receipt to start the workflow.</p>
          </div>
          <div className="rounded-[24px] border border-slate-800/80 bg-slate-950/70 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
              <ScanLine className="h-4 w-4 text-emerald-300" />
              OCR scan animation
            </div>
            <p className="mt-2 text-sm text-slate-400">Preview the mocked OCR pipeline and confidence score.</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function AnalysisPanel({ analysis }: { analysis: ReceiptAnalysisData }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="rounded-[32px] border border-slate-800/80 bg-slate-950/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-300">OCR Scan</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-100">Receipt preview and extraction</h3>
          </div>
          <Badge variant="secondary">{analysis.confidence}% confidence</Badge>
        </div>

        <div className="mt-6 rounded-[28px] border border-slate-800/80 bg-slate-900/70 p-5">
          <div className="flex items-center gap-3 text-slate-100">
            <Loader2 className="h-5 w-5 animate-spin text-emerald-300" />
            <span className="font-semibold">Scanning receipt lines</span>
          </div>
          <div className="mt-4 grid gap-3">
            {analysis.items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-300">{item.confidence}%</p>
                    <p className="text-xs text-slate-500">confidence</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="rounded-[32px] border border-slate-800/80 bg-slate-950/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-300">Carbon Analysis</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-100">Lifecycle scoring</h3>
          </div>
          <Badge variant="warning">{analysis.carbonMetrics.score}/100</Badge>
        </div>

        <div className="mt-6 rounded-[28px] border border-slate-800/80 bg-slate-900/70 p-5">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Carbon calculation</span>
            <span className="font-semibold text-slate-100">{analysis.carbonProgress}%</span>
          </div>
          <Progress value={analysis.carbonProgress} className="mt-3" />
          <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-100">Total emissions</p>
              <p className="text-xs text-slate-400">{analysis.carbonMetrics.totalEmissions} kg CO₂</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-emerald-300">{analysis.carbonMetrics.benchmark}</p>
              <p className="text-xs text-slate-500">benchmark</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function RecommendationsPanel({ analysis }: { analysis: ReceiptAnalysisData }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-800/80 bg-slate-950/70 p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-emerald-300">AI Recommendations</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-100">Greener alternatives</h3>
        </div>
        <Badge variant="success">{analysis.recommendations.length} suggested</Badge>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {analysis.recommendations.map((recommendation) => (
          <Card key={recommendation.id} className="rounded-[24px] border-slate-800/80 bg-slate-900/70 p-5">
            <div className="flex items-center gap-2 text-emerald-300">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">{recommendation.category}</span>
            </div>
            <h4 className="mt-4 text-lg font-semibold text-slate-100">{recommendation.title}</h4>
            <p className="mt-2 text-sm leading-6 text-slate-400">{recommendation.description}</p>
            <div className="mt-4 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3 text-sm text-slate-300">
              <p>{recommendation.impact}</p>
              <p className="mt-1 text-emerald-300">{recommendation.savings}</p>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

function SummaryPanel({ analysis }: { analysis: ReceiptAnalysisData }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="rounded-[32px] border border-slate-800/80 bg-slate-950/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-300">Sustainability Summary</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-100">Why this receipt matters</h3>
          </div>
          <Badge variant="secondary">Insights ready</Badge>
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-400">{analysis.summary}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4">
            <div className="flex items-center gap-2 text-emerald-300">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-semibold">Reduction potential</span>
            </div>
            <p className="mt-3 text-3xl font-semibold text-slate-100">{analysis.carbonMetrics.reductionPotential}%</p>
          </div>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4">
            <div className="flex items-center gap-2 text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm font-semibold">Efficiency score</span>
            </div>
            <p className="mt-3 text-3xl font-semibold text-slate-100">{analysis.carbonMetrics.efficiency}%</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="rounded-[32px] border border-slate-800/80 bg-slate-950/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-300">Activity Timeline</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-100">Workflow events</h3>
          </div>
          <Badge variant="secondary">Live</Badge>
        </div>
        <div className="mt-6 space-y-3">
          {analysis.timeline.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                </div>
                <div className="text-right text-xs text-slate-500">{item.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function WorkspacePage() {
  const { analysis, isLoading, error } = useWorkspaceAnalysis()

  if (isLoading) {
    return <WorkspaceSkeleton />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  if (!analysis) {
    return <EmptyState />
  }

  return (
    <div className="space-y-6">
      <UploadPanel analysis={analysis} />
      <AnalysisPanel analysis={analysis} />
      <RecommendationsPanel analysis={analysis} />
      <SummaryPanel analysis={analysis} />
      <div className="flex justify-end">
        <Button size="lg">Save analysis</Button>
      </div>
    </div>
  )
}
