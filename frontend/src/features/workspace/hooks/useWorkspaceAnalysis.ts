import { useEffect, useState } from 'react'
import { getWorkspaceAnalysis } from '@/features/workspace/services/workspaceService'
import type { ReceiptAnalysisData } from '@/features/workspace/types'

export function useWorkspaceAnalysis() {
  const [analysis, setAnalysis] = useState<ReceiptAnalysisData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadAnalysis = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getWorkspaceAnalysis()
        if (isMounted) {
          setAnalysis(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unable to load workspace analysis')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadAnalysis()

    return () => {
      isMounted = false
    }
  }, [])

  return { analysis, isLoading, error }
}
