export const env = {
  appName: import.meta.env.VITE_APP_NAME ?? 'EcoLens AI',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
}
