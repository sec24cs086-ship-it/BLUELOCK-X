import { useEffect, useMemo, useState } from 'react'
import { exportAnalysis, getAnalysisSummary, saveAnalysis } from '@/services/analysis.service'
import type { AnalysisSummaryPayload } from '@/types/analysis.types'

export function useAnalysisSummary() {
  const [summary, setSummary] = useState<AnalysisSummaryPayload | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      const data = await getAnalysisSummary()
      setSummary(data)
      setIsLoading(false)
    }

    void load()
  }, [])

  const handleSaveAnalysis = useMemo(() => async () => {
    const result = await saveAnalysis()
    setStatusMessage(`Saved (${result.status})`)
  }, [])

  const handleExportAnalysis = useMemo(() => async () => {
    const result = await exportAnalysis()
    setStatusMessage(`Exported (${result.status})`)
  }, [])

  return {
    summary,
    isLoading,
    statusMessage,
    saveAnalysis: handleSaveAnalysis,
    exportAnalysis: handleExportAnalysis,
  }
}
