export type RecommendationPriorityLevel = 'High' | 'Medium' | 'Low'
export type RecommendationDifficulty = 'Easy' | 'Moderate' | 'Advanced'
export type RecommendationAvailability = 'High' | 'Medium' | 'Low'

export interface Recommendation {
  id: string
  title: string
  productName: string
  suggestedAlternative: string
  category: string
  priority: RecommendationPriorityLevel
  confidence: number
  carbonSavingsKg: number
  costComparison: string
  costDifference: number
  waterSavingsLiters: number
  treeEquivalent: number
  explanation: string
  reason: string
  impactScore: number
  difficulty: RecommendationDifficulty
  availability: RecommendationAvailability
  applied?: boolean
  rank?: number
}

export interface RecommendationSummaryData {
  totalPotentialKg: number
  estimatedAnnualSavings: string
  averageConfidence: number
  topPriority: RecommendationPriorityLevel
  coachMessage: string
}

export interface RecommendationInsight {
  label: string
  value: string
  detail: string
}

export interface RecommendationRankingData {
  headline: string
  description: string
  focusArea: string
}

export interface RecommendationEnginePayload {
  summary: RecommendationSummaryData
  rankings: RecommendationRankingData
  insights: RecommendationInsight[]
  coachSummary: string
  recommendations: Recommendation[]
}
