import { AxiosHeaders, type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { env } from '@/config/env'
import type { ApiErrorResponse } from '@/types/api.types'

export function injectRequestId(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const requestId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}`
  const headers = new AxiosHeaders(config.headers)
  headers.set('X-Request-ID', requestId)

  return {
    ...config,
    headers,
  }
}

export function attachAuthToken(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token = localStorage.getItem(env.authTokenKey)
  if (!token) {
    return config
  }

  const headers = new AxiosHeaders(config.headers)
  headers.set('Authorization', `Bearer ${token}`)

  return {
    ...config,
    headers,
  }
}

export function normalizeResponse<T>(response: AxiosResponse<T>): AxiosResponse<T> {
  return response
}

export function handleApiError(error: AxiosError<unknown>): ApiErrorResponse {
  const responseData = error.response?.data as Partial<ApiErrorResponse> | undefined
  const status = error.response?.status ?? 500
  const message = responseData?.message ?? error.message ?? 'Unexpected API error'
  const code = responseData?.code ?? 'API_ERROR'

  return {
    success: false,
    message,
    code,
    status,
  }
}

export function createLoadingState<T>(value: T) {
  return { data: value, loading: false }
}
