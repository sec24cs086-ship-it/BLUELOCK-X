import { useEffect, useState } from 'react'
import { getOCRProgress, getOCRResult, startOCR } from '@/features/workspace/services/ocr.service'
import type { OCRState } from '@/features/workspace/types/ocr.types'

const initialState: OCRState = {
  status: 'idle',
  progress: 0,
  stages: [
    { id: 'stage-1', label: 'Image intake', status: 'pending', detail: 'Preparing receipt for OCR.' },
    { id: 'stage-2', label: 'Layout analysis', status: 'pending', detail: 'Mapping text blocks.' },
    { id: 'stage-3', label: 'Text extraction', status: 'pending', detail: 'Extracting line items.' },
    { id: 'stage-4', label: 'Confidence scoring', status: 'pending', detail: 'Validating extracted values.' },
  ],
}

export function useOCRProcessing() {
  const [state, setState] = useState<OCRState>(initialState)

  useEffect(() => {
    let isMounted = true

    async function runSimulation() {
      setState({ ...initialState, status: 'processing' })
      await startOCR()

      const progressUpdates = [18, 36, 54, 72, 88, 100]
      const nextStages = [
        { id: 'stage-1', label: 'Image intake', status: 'complete' as const, detail: 'Receipt image loaded successfully.' },
        { id: 'stage-2', label: 'Layout analysis', status: 'active' as const, detail: 'Document structure detected.' },
        { id: 'stage-3', label: 'Text extraction', status: 'pending' as const, detail: 'Character clusters classified.' },
        { id: 'stage-4', label: 'Confidence scoring', status: 'pending' as const, detail: 'Merchant and totals validated.' },
      ]

      for (const progress of progressUpdates) {
        if (!isMounted) {
          return
        }

        const currentStages = progress >= 36
          ? [
              { ...nextStages[0], status: 'complete' as const },
              { ...nextStages[1], status: progress >= 72 ? 'complete' as const : 'active' as const },
              { ...nextStages[2], status: progress >= 88 ? 'active' as const : 'pending' as const },
              { ...nextStages[3], status: progress >= 100 ? 'complete' as const : 'pending' as const },
            ]
          : [
              { ...nextStages[0], status: 'complete' as const },
              { ...nextStages[1], status: 'active' as const },
              { ...nextStages[2], status: 'pending' as const },
              { ...nextStages[3], status: 'pending' as const },
            ]

        setState((current) => ({
          ...current,
          progress,
          stages: currentStages,
        }))

        await getOCRProgress()
      }

      const result = await getOCRResult()

      if (isMounted) {
        setState({
          status: 'complete',
          progress: result.progress,
          stages: result.stages,
          result,
        })
      }
    }

    void runSimulation()

    return () => {
      isMounted = false
    }
  }, [])

  return state
}
