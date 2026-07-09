import { motion } from 'framer-motion'
import { useDashboard } from '@/hooks/useDashboard'
import { AchievementsPanel } from './AchievementsPanel'
import { AIInsightsPanel } from './AIInsightsPanel'
import { CarbonTrendChart } from './CarbonTrendChart'
import { CategoryBreakdownChart } from './CategoryBreakdownChart'
import { DashboardHeader } from './DashboardHeader'
import { EcoScoreChart } from './EcoScoreChart'
import { EnvironmentalStatistics } from './EnvironmentalStatistics'
import { KpiCards } from './KpiCards'
import { RecentActivity } from './RecentActivity'
import { RecentReceipts } from './RecentReceipts'
import { RecommendationImpactChart } from './RecommendationImpactChart'
import { SustainabilityGoals } from './SustainabilityGoals'

export function Dashboard() {
  const { dashboard, statistics, isLoading } = useDashboard()

  if (isLoading || !dashboard || !statistics) {
    return <div className="rounded-[28px] border border-slate-800/80 bg-slate-950/70 p-6 text-sm text-slate-400">Loading sustainability dashboard…</div>
  }

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-4">
      <DashboardHeader />
      <KpiCards kpis={dashboard.kpis} />

      <div className="grid gap-4 xl:grid-cols-2">
        <CarbonTrendChart data={dashboard.carbonTrend} />
        <EcoScoreChart data={dashboard.ecoScoreTrend} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <CategoryBreakdownChart data={dashboard.categoryEmissions} />
        <RecommendationImpactChart data={dashboard.recommendationImpact} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <RecentReceipts receipts={dashboard.recentReceipts} />
          <RecentActivity items={dashboard.recentActivity} />
        </div>
        <div className="space-y-4">
          <AchievementsPanel achievements={dashboard.achievements} />
          <SustainabilityGoals goals={dashboard.goals} />
          <AIInsightsPanel insights={dashboard.aiInsights} />
          <EnvironmentalStatistics stats={dashboard.environmentalStats} />
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-800/80 bg-slate-950/70 p-4 text-sm text-slate-400">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span>Summary snapshot: {statistics.totalReceipts} receipts • {statistics.totalCarbon} • {statistics.moneySaved} saved</span>
          <span>Eco score {statistics.ecoScore}/100 • {statistics.recommendationCount} recommendations</span>
        </div>
      </div>
    </motion.section>
  )
}
