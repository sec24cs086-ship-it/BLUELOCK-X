import { useMemo, type ReactNode } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { ThemeContext } from '@/contexts/ThemeContext'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme()

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
