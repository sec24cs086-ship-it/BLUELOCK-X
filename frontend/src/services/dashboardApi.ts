import { request } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import type { ApiResponseEnvelope } from '@/types/api.types'

export interface DashboardOverviewRecord {
  totalEmissions: number
  trend: number
  engagementScore: number
}

export async function getDashboardOverview() {
  return request<ApiResponseEnvelope<DashboardOverviewRecord>>({
    method: 'GET',
    url: API_ENDPOINTS.dashboard,
  })
}

export async function getDashboardStatistics() {
  return request<ApiResponseEnvelope<Record<string, number>>>({
    method: 'GET',
    url: API_ENDPOINTS.dashboard,
  })
}
