import ocrData from '@/features/workspace/mock/ocr-processing.json'
import type { OCRResult } from '@/features/workspace/types/ocr.types'

const mockResult = ocrData as OCRResult

export function startOCR(): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(), 400)
  })
}

export function getOCRProgress(): Promise<number> {
  return new Promise((resolve) => {
    const progressSequence = [18, 36, 54, 72, 88, 100]
    const next = progressSequence.shift()
    resolve(next ?? 100)
  })
}

export function getOCRResult(): Promise<OCRResult> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(mockResult), 600)
  })
}
