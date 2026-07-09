import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMemo, useState, type ReactNode } from 'react'
import { QueryContext } from '@/contexts/QueryContext'

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  const value = useMemo(() => queryClient, [queryClient])

  return (
    <QueryClientProvider client={queryClient}>
      <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
    </QueryClientProvider>
  )
}
