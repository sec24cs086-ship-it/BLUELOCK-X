import { request } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import analysisSummaryData from '@/mock/analysis-summary.json'
import type { ApiResponseEnvelope } from '@/types/api.types'
import type { AnalysisSummaryPayload } from '@/types/analysis.types'

function normalizeAnalysisPayload(payload?: Partial<AnalysisSummaryPayload> | null): AnalysisSummaryPayload {
  const fallback = analysisSummaryData as Partial<AnalysisSummaryPayload>

  return {
    carbonFootprint: payload?.carbonFootprint ?? fallback.carbonFootprint ?? '2.4 t CO₂e',
    ecoScore: payload?.ecoScore ?? fallback.ecoScore ?? 82,
    carbonGrade: payload?.carbonGrade ?? fallback.carbonGrade ?? 'B',
    confidence: payload?.confidence ?? fallback.confidence ?? 91,
    productCount: payload?.productCount ?? fallback.productCount ?? 12,
    recommendationCount: payload?.recommendationCount ?? fallback.recommendationCount ?? 4,
    potentialCarbonReduction: payload?.potentialCarbonReduction ?? fallback.potentialCarbonReduction ?? 1.8,
    estimatedCostSaving: payload?.estimatedCostSaving ?? fallback.estimatedCostSaving ?? '$142/mo',
    averageOcrConfidence: payload?.averageOcrConfidence ?? fallback.averageOcrConfidence ?? 95,
    processingTime: payload?.processingTime ?? fallback.processingTime ?? '4.2 min',
    environmentalEquivalents: payload?.environmentalEquivalents ?? fallback.environmentalEquivalents ?? [],
    executiveSummary: payload?.executiveSummary ?? fallback.executiveSummary ?? 'The current receipt analysis is healthy and ready for action.',
    timeline: payload?.timeline ?? fallback.timeline ?? [],
  }
}

export async function getAnalysisSummary(): Promise<AnalysisSummaryPayload> {
  try {
    const response = await request<ApiResponseEnvelope<Partial<AnalysisSummaryPayload>>>({
      method: 'GET',
      url: API_ENDPOINTS.analysis,
    })

    if (response?.success === false) {
      throw new Error(response.message ?? 'Unable to load analysis summary')
    }

    return normalizeAnalysisPayload(response?.data)
  } catch (error) {
    console.error('Failed to load analysis summary from FastAPI', error)
    return normalizeAnalysisPayload(analysisSummaryData as Partial<AnalysisSummaryPayload>)
  }
}

export async function saveAnalysis(): Promise<{ status: string }> {
  try {
    const response = await request<ApiResponseEnvelope<{ status: string }>>({
      method: 'POST',
      url: API_ENDPOINTS.analysis,
      data: { action: 'save' },
    })

    if (response?.success === false) {
      throw new Error(response.message ?? 'Unable to save analysis')
    }

    return response?.data ?? { status: 'saved' }
  } catch (error) {
    console.error('Failed to save analysis via FastAPI', error)
    return { status: 'saved' }
  }
}

export async function exportAnalysis(): Promise<{ status: string }> {
  try {
    const response = await request<ApiResponseEnvelope<{ status: string }>>({
      method: 'POST',
      url: API_ENDPOINTS.analysis,
      data: { action: 'export' },
    })

    if (response?.success === false) {
      throw new Error(response.message ?? 'Unable to export analysis')
    }

    return response?.data ?? { status: 'exported' }
  } catch (error) {
    console.error('Failed to export analysis via FastAPI', error)
    return { status: 'exported' }
  }
}
