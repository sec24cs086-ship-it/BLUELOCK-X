import dashboardData from '@/mock/dashboard.json'
import statisticsData from '@/mock/dashboard-statistics.json'
import historyData from '@/mock/dashboard-history.json'
import type { DashboardPayload, DashboardStatisticsPayload } from '@/types/dashboard.types'

export async function getDashboard(): Promise<DashboardPayload> {
  return dashboardData as DashboardPayload
}

export async function getStatistics(): Promise<DashboardStatisticsPayload> {
  return statisticsData as DashboardStatisticsPayload
}

export async function getRecentActivity(): Promise<Array<{ id: string; label: string; detail: string; time: string }>> {
  return historyData as Array<{ id: string; label: string; detail: string; time: string }>
}
