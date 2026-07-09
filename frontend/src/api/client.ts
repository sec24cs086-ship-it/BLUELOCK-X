import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { env } from '@/config/env'
import { attachAuthToken, handleApiError, injectRequestId, normalizeResponse } from './interceptors'

const defaultConfig: AxiosRequestConfig = {
  baseURL: env.apiBaseUrl,
  timeout: env.requestTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
}

export const apiClient = axios.create(defaultConfig)

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const nextConfig = injectRequestId(config)
  return attachAuthToken(nextConfig)
})

apiClient.interceptors.response.use(
  (response: AxiosResponse) => normalizeResponse(response),
  (error: AxiosError) => Promise.reject(handleApiError(error)),
)

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.request<T>(config)
  return response.data
}
