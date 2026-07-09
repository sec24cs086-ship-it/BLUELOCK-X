export type ProductCategory = 'Groceries' | 'Beverages' | 'Household' | 'Produce' | 'Bakery' | 'Other'

export interface ExtractedProduct {
  id: string
  name: string
  category: ProductCategory
  confidence: number
  quantity: number
  unitPrice: number
  source: 'ocr' | 'manual'
}

export interface ProductFiltersState {
  search: string
  category: ProductCategory | 'All'
  confidence: 'All' | 'High' | 'Medium' | 'Low'
  sortBy: 'confidence' | 'price'
  sortDirection: 'asc' | 'desc'
  viewMode: 'table' | 'card'
}
