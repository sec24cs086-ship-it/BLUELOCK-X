import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { LandingShell } from '@/components/layout/LandingShell'
import { ProtectedRoute } from './ProtectedRoute'
import { LandingPage } from '@/pages/LandingPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <LandingShell>
        <LandingPage />
      </LandingShell>
    ),
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
])

export default router
