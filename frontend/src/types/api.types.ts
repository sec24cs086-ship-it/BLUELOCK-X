export interface ApiResponseEnvelope<T = unknown> {
  success: boolean
  data?: T
  message?: string
  code?: string
  status?: number
}

export interface ApiErrorResponse {
  success: false
  message: string
  code: string
  status: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export interface ApiRequestState<T> {
  data: T | null
  loading: boolean
  error: ApiErrorResponse | null
}
