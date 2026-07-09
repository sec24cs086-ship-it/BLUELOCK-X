import { useEffect, useState } from 'react'
import { getDashboard, getRecentActivity, getStatistics } from '@/services/dashboard.service'
import type { DashboardPayload, DashboardStatisticsPayload } from '@/types/dashboard.types'

export function useDashboard() {
  const [dashboard, setDashboard] = useState<DashboardPayload | null>(null)
  const [statistics, setStatistics] = useState<DashboardStatisticsPayload | null>(null)
  const [activity, setActivity] = useState<Array<{ id: string; label: string; detail: string; time: string }>>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      const [dashboardData, statisticsData, activityData] = await Promise.all([getDashboard(), getStatistics(), getRecentActivity()])
      setDashboard(dashboardData)
      setStatistics(statisticsData)
      setActivity(activityData)
      setIsLoading(false)
    }

    void load()
  }, [])

  return { dashboard, statistics, activity, isLoading }
}
