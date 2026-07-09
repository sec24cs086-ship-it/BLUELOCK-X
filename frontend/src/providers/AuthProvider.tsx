import { useMemo, useState, type ReactNode } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import type { AuthState, User } from '@/types'

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(initialState)

  const login = (user: User) => {
    setAuthState({ user, isAuthenticated: true, isLoading: false })
  }

  const logout = () => {
    setAuthState(initialState)
    window.localStorage.removeItem('accessToken')
  }

  const value = useMemo(
    () => ({ ...authState, login, logout }),
    [authState],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
