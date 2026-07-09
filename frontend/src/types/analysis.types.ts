export type AnalysisGrade = 'A' | 'B' | 'C' | 'D'

export interface EnvironmentalEquivalent {
  label: string
  value: string
  detail: string
}

export interface AnalysisTimelineEvent {
  title: string
  detail: string
  timestamp: string
}

export interface AnalysisSummaryPayload {
  carbonFootprint: string
  ecoScore: number
  carbonGrade: AnalysisGrade
  confidence: number
  productCount: number
  recommendationCount: number
  potentialCarbonReduction: number
  estimatedCostSaving: string
  averageOcrConfidence: number
  processingTime: string
  environmentalEquivalents: EnvironmentalEquivalent[]
  executiveSummary: string
  timeline: AnalysisTimelineEvent[]
}
