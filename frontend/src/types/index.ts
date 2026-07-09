export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  company?: string
  teamSize?: string
  focusArea?: string
  userType?: 'operator' | 'finance' | 'strategy'
  onboardingCompleted?: boolean
  profileComplete?: boolean
  emailVerified?: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthContextValue extends AuthState {
  login: (user: User) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

export interface ThemeContextValue {
  theme: 'dark' | 'light' | 'system'
  setTheme: (theme: ThemeContextValue['theme']) => void
}

export interface ToastItem {
  id: string
  title: string
  message?: string
  variant?: 'default' | 'success' | 'danger' | 'warning'
}

export interface ToastContextValue {
  addToast: (toast: Omit<ToastItem, 'id'>) => void
  dismissToast: (id: string) => void
}

export interface LoadingContextValue {
  isLoading: boolean
  setLoading: (value: boolean) => void
}

export interface AppSettings {
  sidebarCollapsed: boolean
  theme: 'dark' | 'light' | 'system'
  toastCount: number
}

export interface NavigationItem {
  id: string
  label: string
  href: string
  icon?: string
}
