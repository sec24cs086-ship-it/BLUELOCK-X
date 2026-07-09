import carbonFactorsData from '@/features/workspace/mock/carbon-factors.json'
import carbonResultsData from '@/features/workspace/mock/carbon-results.json'
import regionalAdjustmentsData from '@/features/workspace/mock/regional-adjustments.json'
import type { CarbonBreakdown, CarbonFactor, CarbonResult, CarbonSummary, RegionalAdjustment } from '@/features/workspace/types/carbon.types'

const carbonFactors = carbonFactorsData as CarbonFactor[]
const carbonResults = carbonResultsData as CarbonResult[]
const regionalAdjustments = regionalAdjustmentsData as RegionalAdjustment[]

export async function calculateCarbon(): Promise<CarbonResult[]> {
  return carbonResults
}

export async function getCarbonBreakdown(): Promise<CarbonBreakdown> {
  const totalKg = carbonResults.reduce((sum, product) => sum + product.totalCarbonScore, 0)
  const weightedScore = Math.round(
    carbonResults.reduce((sum, product) => sum + product.confidence * (product.totalCarbonScore / totalKg), 0),
  )

  const byCategory = carbonFactors.map((factor) => ({
    label: factor.category,
    value: Number((factor.baseFactor + factor.transportFactor + factor.storageFactor).toFixed(2)),
    unit: 'score',
    detail: factor.explanation,
  }))

  const primaryDrivers = [
    { label: 'Packaging impact', value: 1.82, unit: 'kg', detail: 'Higher impact packaging drove most of the score' },
    { label: 'Transport impact', value: 1.46, unit: 'kg', detail: 'Longer routes amplify emissions' },
    { label: 'Storage impact', value: 0.74, unit: 'kg', detail: 'Cold storage adds measurable footprint' },
  ]

  return {
    totalKg: Number(totalKg.toFixed(2)),
    weightedScore,
    byCategory,
    primaryDrivers,
  }
}

export async function getCarbonSummary(): Promise<CarbonSummary> {
  const totalEmissionsKg = Number(
    carbonResults.reduce((sum, product) => sum + product.totalCarbonScore, 0).toFixed(2),
  )
  const averageConfidence = Math.round(
    carbonResults.reduce((sum, product) => sum + product.confidence, 0) / carbonResults.length,
  )
  const flaggedProducts = carbonResults.filter((product) => product.totalCarbonScore > 2).length
  const score = Math.max(40, Math.min(96, Math.round(100 - totalEmissionsKg * 8 + averageConfidence * 0.1)))
  const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : 'D'

  return {
    score,
    grade,
    totalEmissionsKg,
    averageConfidence,
    highConfidenceCount: carbonResults.filter((product) => product.confidence >= 90).length,
    flaggedProducts,
    summary: 'The current basket is mostly efficient, though packaging and transport are the largest leverage areas.',
    adjustments: regionalAdjustments,
  }
}
