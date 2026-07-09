import { request } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import type { ApiResponseEnvelope, PaginatedResponse } from '@/types/api.types'

export interface ReceiptRecord {
  id: string
  filename: string
  uploadedAt: string
  status: 'pending' | 'processed' | 'failed'
}

export async function listReceipts() {
  return request<ApiResponseEnvelope<PaginatedResponse<ReceiptRecord>>>({
    method: 'GET',
    url: API_ENDPOINTS.receipts.list,
  })
}

export async function uploadReceipt(formData: FormData) {
  return request<ApiResponseEnvelope<{ id: string }>>({
    method: 'POST',
    url: API_ENDPOINTS.receipts.upload,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
