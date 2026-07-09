export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api',
  authTokenKey: import.meta.env.VITE_AUTH_TOKEN_KEY ?? 'ecolens_token',
  requestTimeout: Number(import.meta.env.VITE_REQUEST_TIMEOUT ?? 10000),
}