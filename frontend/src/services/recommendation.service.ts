import recommendationEngineData from '@/mock/recommendation-engine.json'
import recommendationInsightsData from '@/mock/recommendation-insights.json'
import recommendationRankingData from '@/mock/recommendation-ranking.json'
import type { Recommendation, RecommendationEnginePayload, RecommendationInsight, RecommendationPriorityLevel, RecommendationRankingData, RecommendationSummaryData } from '@/types/recommendation.types'

const priorityRank: Record<RecommendationPriorityLevel, number> = {
  High: 3,
  Medium: 2,
  Low: 1,
}

function normalizeRecommendations(recommendations: Recommendation[], baselineScore = 0): Recommendation[] {
  return recommendations.map((recommendation, index) => ({
    ...recommendation,
    carbonSavingsKg: Number((recommendation.carbonSavingsKg + baselineScore / 1000 + index * 0.01).toFixed(2)),
    impactScore: Math.min(99, recommendation.impactScore + Math.round(baselineScore / 20)),
    costDifference: Number((recommendation.costDifference + baselineScore / 100).toFixed(2)),
  }))
}

export async function getRecommendations(baseLineScore = 0): Promise<RecommendationEnginePayload> {
  const engineSummary = recommendationEngineData.summary as RecommendationSummaryData
  const ranking = recommendationRankingData as RecommendationRankingData
  const insights = recommendationInsightsData.insights as RecommendationInsight[]
  const recommendations = normalizeRecommendations(recommendationEngineData.recommendations as Recommendation[], baseLineScore)

  return {
    summary: {
      ...engineSummary,
      totalPotentialKg: Number((engineSummary.totalPotentialKg + baseLineScore / 100).toFixed(2)),
    },
    rankings: ranking,
    insights,
    coachSummary: recommendationInsightsData.coachSummary as string,
    recommendations,
  }
}

export function rankRecommendations(recommendations: Recommendation[]): Recommendation[] {
  return [...recommendations]
    .sort((left, right) => {
      if (priorityRank[right.priority] !== priorityRank[left.priority]) {
        return priorityRank[right.priority] - priorityRank[left.priority]
      }

      if (right.impactScore !== left.impactScore) {
        return right.impactScore - left.impactScore
      }

      if (right.confidence !== left.confidence) {
        return right.confidence - left.confidence
      }

      return right.carbonSavingsKg - left.carbonSavingsKg
    })
    .map((recommendation, index) => ({ ...recommendation, rank: index + 1 }))
}

export function applyRecommendation(recommendations: Recommendation[], recommendationId: string): Recommendation[] {
  return recommendations.map((recommendation) =>
    recommendation.id === recommendationId ? { ...recommendation, applied: true } : recommendation,
  )
}

export function applyAllRecommendations(recommendations: Recommendation[]): Recommendation[] {
  return recommendations.map((recommendation) => ({ ...recommendation, applied: true }))
}
