import { RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { QueryProvider } from '@/providers/QueryProvider'
import { AuthProvider } from '@/providers/AuthProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { ToastProvider } from '@/providers/ToastProvider'
import { LoadingProvider } from '@/providers/LoadingProvider'
import router from '@/routes'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryProvider>
          <AuthProvider>
            <LoadingProvider>
              <ToastProvider>
                <RouterProvider router={router} />
              </ToastProvider>
            </LoadingProvider>
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
