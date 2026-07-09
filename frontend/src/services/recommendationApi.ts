import { request } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import type { ApiResponseEnvelope, PaginatedResponse } from '@/types/api.types'

export interface RecommendationRecord {
  id: string
  title: string
  priority: 'high' | 'medium' | 'low'
  confidence: number
  impactScore: number
  carbonSavings: number
  waterSavings: number
}

export async function listRecommendations() {
  return request<ApiResponseEnvelope<PaginatedResponse<RecommendationRecord>>>({
    method: 'GET',
    url: API_ENDPOINTS.recommendations,
  })
}

export async function applyRecommendation(id: string) {
  return request<ApiResponseEnvelope<{ applied: boolean }>>({
    method: 'POST',
    url: API_ENDPOINTS.recommendations,
    data: { id },
  })
}
