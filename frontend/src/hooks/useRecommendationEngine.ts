import { useEffect, useMemo, useState } from 'react'
import { applyAllRecommendations, applyRecommendation, getRecommendations, rankRecommendations } from '@/services/recommendation.service'
import type { Recommendation, RecommendationEnginePayload } from '@/types/recommendation.types'

export function useRecommendationEngine() {
  const [engineData, setEngineData] = useState<RecommendationEnginePayload | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isApplying, setIsApplying] = useState(false)

  useEffect(() => {
    async function loadRecommendations() {
      setIsLoading(true)
      const data = await getRecommendations()
      const ranked = rankRecommendations(data.recommendations)
      setEngineData(data)
      setRecommendations(ranked)
      setIsLoading(false)
    }

    void loadRecommendations()
  }, [])

  const summary = useMemo(() => engineData?.summary ?? null, [engineData])
  const ranking = useMemo(() => engineData?.rankings ?? null, [engineData])
  const insights = useMemo(() => engineData?.insights ?? [], [engineData])
  const coachSummary = useMemo(() => engineData?.coachSummary ?? '', [engineData])

  function handleApplyRecommendation(recommendationId: string) {
    setIsApplying(true)
    setRecommendations((current) => applyRecommendation(current, recommendationId))
    window.setTimeout(() => setIsApplying(false), 300)
  }

  function handleApplyAllRecommendations() {
    setIsApplying(true)
    setRecommendations((current) => applyAllRecommendations(current))
    window.setTimeout(() => setIsApplying(false), 300)
  }

  return {
    recommendations,
    summary,
    ranking,
    insights,
    coachSummary,
    isLoading,
    isApplying,
    applyRecommendation: handleApplyRecommendation,
    applyAllRecommendations: handleApplyAllRecommendations,
  }
}
