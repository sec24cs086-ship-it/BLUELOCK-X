import analysisSummaryData from '@/mock/analysis-summary.json'
import type { AnalysisSummaryPayload } from '@/types/analysis.types'

export async function getAnalysisSummary(): Promise<AnalysisSummaryPayload> {
  return analysisSummaryData as AnalysisSummaryPayload
}

export async function saveAnalysis(): Promise<{ status: string }> {
  return { status: 'saved' }
}

export async function exportAnalysis(): Promise<{ status: string }> {
  return { status: 'exported' }
}
