import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { ProtectedRoute } from './ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><AppShell /></ProtectedRoute>,
  },
  {
    path: '/app',
    element: <ProtectedRoute><AppShell /></ProtectedRoute>,
    children: [
      { index: true, element: <div className="text-slate-300">Foundation placeholder</div> },
      { path: 'receipts', element: <div className="text-slate-300">Receipts placeholder</div> },
      { path: 'insights', element: <div className="text-slate-300">Insights placeholder</div> },
      { path: 'analytics', element: <div className="text-slate-300">Analytics placeholder</div> },
      { path: 'security', element: <div className="text-slate-300">Security placeholder</div> },
      { path: 'notifications', element: <div className="text-slate-300">Notifications placeholder</div> },
    ],
  },
  {
    path: '/auth',
    element: <div className="text-slate-300">Auth placeholder</div>,
  },
])

export default router
