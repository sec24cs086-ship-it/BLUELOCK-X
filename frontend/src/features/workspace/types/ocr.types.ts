export interface OCRStage {
  id: string
  label: string
  status: 'pending' | 'active' | 'complete'
  detail: string
}

export interface OCRBoundingBox {
  id: string
  label: string
  x: number
  y: number
  width: number
  height: number
  confidence: number
}

export interface OCRMetrics {
  linesDetected: number
  wordsDetected: number
  confidence: number
  processingTimeMs: number
}

export interface OCRResult {
  progress: number
  stages: OCRStage[]
  boxes: OCRBoundingBox[]
  statistics: OCRMetrics
  completedAt: string
}

export interface OCRState {
  status: 'idle' | 'processing' | 'complete'
  progress: number
  stages: OCRStage[]
  result?: OCRResult
}
