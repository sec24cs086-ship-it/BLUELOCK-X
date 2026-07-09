export interface DashboardKpi {
  label: string
  value: string
  change: string
  positive: boolean
}

export interface DashboardPoint {
  name: string
  value: number
}

export interface DashboardCategoryEmissions {
  name: string
  value: number
  fill: string
}

export interface RecentReceipt {
  id: string
  merchant: string
  date: string
  total: string
  impact: string
}

export interface RecentActivityItem {
  id: string
  label: string
  detail: string
  time: string
}

export interface Achievement {
  id: string
  title: string
  subtitle: string
  unlocked: boolean
}

export interface SustainabilityGoal {
  id: string
  title: string
  progress: number
  target: string
}

export interface DashboardPayload {
  kpis: DashboardKpi[]
  carbonTrend: DashboardPoint[]
  ecoScoreTrend: DashboardPoint[]
  categoryEmissions: DashboardCategoryEmissions[]
  recommendationImpact: DashboardPoint[]
  recentReceipts: RecentReceipt[]
  recentActivity: RecentActivityItem[]
  achievements: Achievement[]
  goals: SustainabilityGoal[]
  aiInsights: string[]
  environmentalStats: Array<{ label: string; value: string; detail: string }>
}

export interface DashboardStatisticsPayload {
  totalReceipts: number
  totalCarbon: string
  carbonSaved: string
  ecoScore: number
  recommendationCount: number
  moneySaved: string
}
