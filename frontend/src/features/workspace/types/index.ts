export interface ReceiptAnalysisData {
  id: string
  merchant: string
  date: string
  total: number
  confidence: number
  status: 'queued' | 'processing' | 'complete' | 'error'
  uploadProgress: number
  ocrProgress: number
  carbonProgress: number
  summary: string
  merchantAddress?: string
  currency: string
  items: ProductDetectionItem[]
  carbonMetrics: CarbonMetrics
  recommendations: RecommendationItem[]
  timeline: TimelineEntry[]
}

export interface ProductDetectionItem {
  id: string
  name: string
  category: string
  quantity: number
  unitPrice: number
  carbonImpact: number
  confidence: number
}

export interface CarbonMetrics {
  totalEmissions: number
  score: number
  benchmark: string
  reductionPotential: number
  efficiency: number
}

export interface RecommendationItem {
  id: string
  title: string
  description: string
  impact: string
  savings: string
  category: string
}

export interface TimelineEntry {
  id: string
  title: string
  description: string
  timestamp: string
  completed: boolean
}

export interface UploadState {
  isDragging: boolean
  progress: number
  status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error'
  fileName?: string
}
