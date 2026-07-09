import { useMemo, useState, type ReactNode } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { getStoredSession } from '@/services/auth'
import type { AuthState, User } from '@/types'

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const storedUser = getStoredSession()
    return storedUser
      ? { user: storedUser, isAuthenticated: true, isLoading: false }
      : initialState
  })

  const login = (user: User) => {
    setAuthState({ user, isAuthenticated: true, isLoading: false })
  }

  const logout = () => {
    setAuthState(initialState)
    window.localStorage.removeItem('accessToken')
  }

  const updateUser = (updates: Partial<User>) => {
    setAuthState((current) => {
      if (!current.user) {
        return current
      }

      return { ...current, user: { ...current.user, ...updates } }
    })
  }

  const value = useMemo(
    () => ({ ...authState, login, logout, updateUser }),
    [authState],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
