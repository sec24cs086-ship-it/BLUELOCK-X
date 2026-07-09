export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh',
  },
  upload: '/upload',
  ocr: '/ocr',
  extractProducts: '/extract-products',
  calculateCarbon: '/calculate-carbon',
  recommendations: '/recommendations',
  analysis: '/analysis',
  dashboard: '/dashboard',
  receipts: {
    list: '/receipts',
    upload: '/receipts/upload',
    detail: (id: string) => `/receipts/${id}`,
  },
  products: {
    list: '/products',
    update: (id: string) => `/products/${id}`,
  },
} as const
