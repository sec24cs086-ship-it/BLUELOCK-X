import { useMemo, useState, type ReactNode } from 'react'
import { LoadingContext } from '@/contexts/LoadingContext'
import type { LoadingContextValue } from '@/types'

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)

  const setLoading = (value: boolean) => {
    setIsLoading(value)
  }

  const value: LoadingContextValue = useMemo(
    () => ({ isLoading, setLoading }),
    [isLoading],
  )

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
}
