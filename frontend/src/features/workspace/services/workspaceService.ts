import { request } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import receiptData from '@/features/workspace/mock/receipt.json'
import productsData from '@/features/workspace/mock/products.json'
import carbonData from '@/features/workspace/mock/carbon.json'
import recommendationsData from '@/features/workspace/mock/recommendations.json'
import timelineData from '@/features/workspace/mock/timeline.json'
import type { ApiResponseEnvelope } from '@/types/api.types'
import type { ReceiptAnalysisData } from '@/features/workspace/types'

const baseAnalysis: ReceiptAnalysisData = {
  ...receiptData,
  status: 'complete',
  items: productsData,
  carbonMetrics: carbonData,
  recommendations: recommendationsData,
  timeline: timelineData,
}

export async function getWorkspaceAnalysis(): Promise<ReceiptAnalysisData> {
  try {
    const response = await request<ApiResponseEnvelope<ReceiptAnalysisData>>({
      method: 'GET',
      url: API_ENDPOINTS.analysis,
    })

    if (response?.success === false) {
      throw new Error(response.message ?? 'Unable to load workspace analysis')
    }

    return response?.data ?? baseAnalysis
  } catch (error) {
    console.error('FastAPI workspace analysis failed', error)
    return baseAnalysis
  }
}
