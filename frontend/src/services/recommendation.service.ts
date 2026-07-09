import { request } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import recommendationEngineData from '@/mock/recommendation-engine.json'
import recommendationInsightsData from '@/mock/recommendation-insights.json'
import recommendationRankingData from '@/mock/recommendation-ranking.json'
import type { ApiResponseEnvelope } from '@/types/api.types'
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

function normalizeRecommendationPayload(payload?: Partial<RecommendationEnginePayload> | null, baselineScore = 0): RecommendationEnginePayload {
  const engineSummary = (payload?.summary ?? recommendationEngineData.summary) as RecommendationSummaryData
  const ranking = (payload?.rankings ?? recommendationRankingData) as RecommendationRankingData
  const insights = (payload?.insights ?? recommendationInsightsData.insights) as RecommendationInsight[]
  const recommendations = normalizeRecommendations((payload?.recommendations ?? recommendationEngineData.recommendations) as Recommendation[], baselineScore)

  return {
    summary: {
      ...engineSummary,
      totalPotentialKg: Number((engineSummary.totalPotentialKg + baselineScore / 100).toFixed(2)),
    },
    rankings: ranking,
    insights,
    coachSummary: payload?.coachSummary ?? recommendationInsightsData.coachSummary,
    recommendations,
  }
}

export async function getRecommendations(baseLineScore = 0): Promise<RecommendationEnginePayload> {
  try {
    const response = await request<ApiResponseEnvelope<Partial<RecommendationEnginePayload>>>({
      method: 'POST',
      url: API_ENDPOINTS.recommendations,
      data: { action: 'list', baselineScore: baseLineScore },
    })

    if (response?.success === false) {
      throw new Error(response.message ?? 'Unable to load recommendations')
    }

    return normalizeRecommendationPayload(response?.data, baseLineScore)
  } catch (error) {
    console.error('Failed to load recommendations from FastAPI', error)
    return normalizeRecommendationPayload(undefined, baseLineScore)
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
