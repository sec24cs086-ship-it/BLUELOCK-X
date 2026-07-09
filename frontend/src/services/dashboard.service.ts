import { request } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import dashboardData from '@/mock/dashboard.json'
import statisticsData from '@/mock/dashboard-statistics.json'
import historyData from '@/mock/dashboard-history.json'
import type { ApiResponseEnvelope } from '@/types/api.types'
import type { DashboardPayload, DashboardStatisticsPayload } from '@/types/dashboard.types'

function normalizeDashboardPayload(payload?: Partial<DashboardPayload> | null): DashboardPayload {
  const fallback = dashboardData as DashboardPayload

  return {
    kpis: payload?.kpis ?? fallback.kpis,
    carbonTrend: payload?.carbonTrend ?? fallback.carbonTrend,
    ecoScoreTrend: payload?.ecoScoreTrend ?? fallback.ecoScoreTrend,
    categoryEmissions: payload?.categoryEmissions ?? fallback.categoryEmissions,
    recommendationImpact: payload?.recommendationImpact ?? fallback.recommendationImpact,
    recentReceipts: payload?.recentReceipts ?? fallback.recentReceipts,
    recentActivity: payload?.recentActivity ?? fallback.recentActivity,
    achievements: payload?.achievements ?? fallback.achievements,
    goals: payload?.goals ?? fallback.goals,
    aiInsights: payload?.aiInsights ?? fallback.aiInsights,
    environmentalStats: payload?.environmentalStats ?? fallback.environmentalStats,
  }
}

function normalizeStatisticsPayload(payload?: Partial<DashboardStatisticsPayload> | null): DashboardStatisticsPayload {
  const fallback = statisticsData as DashboardStatisticsPayload

  return {
    totalReceipts: payload?.totalReceipts ?? fallback.totalReceipts,
    totalCarbon: payload?.totalCarbon ?? fallback.totalCarbon,
    carbonSaved: payload?.carbonSaved ?? fallback.carbonSaved,
    ecoScore: payload?.ecoScore ?? fallback.ecoScore,
    recommendationCount: payload?.recommendationCount ?? fallback.recommendationCount,
    moneySaved: payload?.moneySaved ?? fallback.moneySaved,
  }
}

export async function getDashboard(): Promise<DashboardPayload> {
  try {
    const response = await request<ApiResponseEnvelope<Partial<DashboardPayload>>>({
      method: 'GET',
      url: API_ENDPOINTS.dashboard,
    })

    if (response?.success === false) {
      throw new Error(response.message ?? 'Unable to load dashboard data')
    }

    return normalizeDashboardPayload(response?.data)
  } catch (error) {
    console.error('Failed to load dashboard from FastAPI', error)
    return normalizeDashboardPayload(dashboardData as Partial<DashboardPayload>)
  }
}

export async function getStatistics(): Promise<DashboardStatisticsPayload> {
  try {
    const response = await request<ApiResponseEnvelope<Partial<DashboardStatisticsPayload>>>({
      method: 'GET',
      url: API_ENDPOINTS.dashboard,
    })

    if (response?.success === false) {
      throw new Error(response.message ?? 'Unable to load dashboard statistics')
    }

    return normalizeStatisticsPayload(response?.data)
  } catch (error) {
    console.error('Failed to load dashboard statistics from FastAPI', error)
    return normalizeStatisticsPayload(statisticsData as Partial<DashboardStatisticsPayload>)
  }
}

export async function getRecentActivity(): Promise<Array<{ id: string; label: string; detail: string; time: string }>> {
  try {
    const response = await request<ApiResponseEnvelope<Array<{ id: string; label: string; detail: string; time: string }>>>({
      method: 'GET',
      url: API_ENDPOINTS.dashboard,
    })

    if (response?.success === false) {
      throw new Error(response.message ?? 'Unable to load recent activity')
    }

    return response?.data ?? (historyData as Array<{ id: string; label: string; detail: string; time: string }>)
  } catch (error) {
    console.error('Failed to load recent activity from FastAPI', error)
    return historyData as Array<{ id: string; label: string; detail: string; time: string }>
  }
}
