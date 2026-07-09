import { env } from '@/config/env'
import { request } from './client'
import { API_ENDPOINTS } from './endpoints'

export async function saveAuthToken(token: string) {
  localStorage.setItem(env.authTokenKey, token)
}

export async function clearAuthToken() {
  localStorage.removeItem(env.authTokenKey)
}

export async function refreshAuthToken() {
  return request<{ accessToken: string }>({
    method: 'POST',
    url: API_ENDPOINTS.auth.refresh,
  })
}
