import receiptData from '@/features/workspace/mock/receipt.json'
import productsData from '@/features/workspace/mock/products.json'
import carbonData from '@/features/workspace/mock/carbon.json'
import recommendationsData from '@/features/workspace/mock/recommendations.json'
import timelineData from '@/features/workspace/mock/timeline.json'
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
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(baseAnalysis), 450)
  })
}
