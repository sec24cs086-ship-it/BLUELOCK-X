import { request } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import type { ApiResponseEnvelope } from '@/types/api.types'

export interface CarbonAnalysisResult {
  score: number
  grade: string
  emissionsKg: number
  savingsPotential: number
}

export async function analyzeCarbon(payload: { products: Array<{ id: string; quantity: number }> }) {
  return request<ApiResponseEnvelope<CarbonAnalysisResult>>({
    method: 'POST',
    url: API_ENDPOINTS.calculateCarbon,
    data: payload,
  })
}
