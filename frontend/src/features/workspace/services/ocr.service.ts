import { request } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import ocrData from '@/features/workspace/mock/ocr-processing.json'
import type { ApiResponseEnvelope } from '@/types/api.types'
import type { OCRResult } from '@/features/workspace/types/ocr.types'

const mockResult = ocrData as OCRResult

export async function startOCR(): Promise<void> {
  try {
    await request<ApiResponseEnvelope<{ status: string }>>({
      method: 'POST',
      url: API_ENDPOINTS.ocr,
      data: { action: 'start' },
    })
  } catch (error) {
    console.error('FastAPI OCR start failed', error)
  }
}

export async function getOCRProgress(): Promise<number> {
  try {
    const response = await request<ApiResponseEnvelope<{ progress: number }>>({
      method: 'GET',
      url: API_ENDPOINTS.ocr,
    })

    if (response?.success === false) {
      throw new Error(response.message ?? 'Unable to determine OCR progress')
    }

    return response?.data?.progress ?? 100
  } catch (error) {
    console.error('FastAPI OCR progress failed', error)
    return 100
  }
}

export async function getOCRResult(): Promise<OCRResult> {
  try {
    const response = await request<ApiResponseEnvelope<OCRResult>>({
      method: 'GET',
      url: API_ENDPOINTS.ocr,
    })

    if (response?.success === false) {
      throw new Error(response.message ?? 'Unable to load OCR result')
    }

    return response?.data ?? mockResult
  } catch (error) {
    console.error('FastAPI OCR result failed', error)
    return mockResult
  }
}
