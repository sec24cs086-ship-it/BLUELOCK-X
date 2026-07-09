import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { ToastContext } from '@/contexts/ToastContext'
import type { ToastItem } from '@/types'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    setToasts((current) => [...current, { ...toast, id }])
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const value = useMemo(() => ({ addToast, dismissToast }), [addToast, dismissToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div key={toast.id} className="rounded-xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm shadow-lg">
            <div className="font-medium">{toast.title}</div>
            {toast.message ? <div className="mt-1 text-slate-400">{toast.message}</div> : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
