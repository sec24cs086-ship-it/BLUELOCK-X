import { request } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import type { ApiResponseEnvelope } from '@/types/api.types'

export interface OcrResult {
  id: string
  extractedText: string
  confidence: number
}

export async function processOcr(payload: { imageUrl?: string; file?: File }) {
  return request<ApiResponseEnvelope<OcrResult>>({
    method: 'POST',
    url: API_ENDPOINTS.ocr,
    data: payload,
  })
}
