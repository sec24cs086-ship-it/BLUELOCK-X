import { request } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import type { ApiResponseEnvelope } from '@/types/api.types'

export interface AnalysisSummaryRecord {
  score: number
  grade: string
  summary: string
  opportunities: string[]
}

export async function getAnalysisSummary() {
  return request<ApiResponseEnvelope<AnalysisSummaryRecord>>({
    method: 'GET',
    url: API_ENDPOINTS.analysis,
  })
}

export async function saveAnalysis(payload: AnalysisSummaryRecord) {
  return request<ApiResponseEnvelope<{ saved: boolean }>>({
    method: 'POST',
    url: API_ENDPOINTS.analysis,
    data: { ...payload, action: 'save' },
  })
}
