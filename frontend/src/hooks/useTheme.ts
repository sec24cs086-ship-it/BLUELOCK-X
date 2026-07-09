import { useEffect, useState } from 'react'

export type ThemeMode = 'dark' | 'light' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') {
      return 'dark'
    }

    const stored = window.localStorage.getItem('theme') as ThemeMode | null
    if (stored) {
      return stored
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    const nextTheme = theme === 'system' ? 'dark' : theme

    root.classList.remove('light', 'dark')
    root.classList.add(nextTheme)
    window.localStorage.setItem('theme', theme)
  }, [theme])

  return { theme, setTheme }
}
