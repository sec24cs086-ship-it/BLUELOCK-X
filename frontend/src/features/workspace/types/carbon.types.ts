export type PackagingType = 'Plastic' | 'Cardboard' | 'Glass' | 'Metal' | 'Biodegradable'

export interface CarbonBreakdownItem {
  label: string
  value: number
  unit: string
  detail: string
}

export interface CarbonFactor {
  category: string
  packagingType: PackagingType
  baseFactor: number
  transportFactor: number
  storageFactor: number
  explanation: string
}

export interface RegionalAdjustment {
  region: string
  adjustment: number
}

export interface CarbonResult {
  id: string
  productName: string
  category: string
  packagingType: PackagingType
  origin: string
  transportDistanceKm: number
  baseEmission: number
  packagingImpact: number
  transportImpact: number
  storageImpact: number
  totalCarbonScore: number
  confidence: number
  explanation: string
  breakdown: CarbonBreakdownItem[]
}

export interface CarbonBreakdown {
  totalKg: number
  weightedScore: number
  byCategory: CarbonBreakdownItem[]
  primaryDrivers: CarbonBreakdownItem[]
}

export interface CarbonSummary {
  score: number
  grade: 'A' | 'B' | 'C' | 'D'
  totalEmissionsKg: number
  averageConfidence: number
  highConfidenceCount: number
  flaggedProducts: number
  summary: string
  adjustments: RegionalAdjustment[]
}
