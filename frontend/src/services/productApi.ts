import { request } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import type { ApiResponseEnvelope, PaginatedResponse } from '@/types/api.types'

export interface ProductRecord {
  id: string
  name: string
  category: string
  carbonScore: number
  region: string
}

export async function listProducts() {
  return request<ApiResponseEnvelope<PaginatedResponse<ProductRecord>>>({
    method: 'GET',
    url: API_ENDPOINTS.products.list,
  })
}

export async function updateProduct(id: string, payload: Partial<ProductRecord>) {
  return request<ApiResponseEnvelope<ProductRecord>>({
    method: 'PATCH',
    url: API_ENDPOINTS.products.update(id),
    data: payload,
  })
}
