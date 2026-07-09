import { useEffect, useState } from 'react'
import { calculateCarbon, getCarbonBreakdown, getCarbonSummary } from '@/features/workspace/services/carbon.service'
import type { CarbonBreakdown, CarbonResult, CarbonSummary } from '@/features/workspace/types/carbon.types'

export function useCarbonEngine() {
  const [products, setProducts] = useState<CarbonResult[]>([])
  const [breakdown, setBreakdown] = useState<CarbonBreakdown | null>(null)
  const [summary, setSummary] = useState<CarbonSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadEngine() {
      setIsLoading(true)
      const [nextProducts, nextBreakdown, nextSummary] = await Promise.all([
        calculateCarbon(),
        getCarbonBreakdown(),
        getCarbonSummary(),
      ])

      if (isMounted) {
        setProducts(nextProducts)
        setBreakdown(nextBreakdown)
        setSummary(nextSummary)
        setIsLoading(false)
      }
    }

    void loadEngine()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    products,
    breakdown,
    summary,
    isLoading,
  }
}
