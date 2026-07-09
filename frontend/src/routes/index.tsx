import { createBrowserRouter, Outlet } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { LandingShell } from '@/components/layout/LandingShell'
import { ProtectedRoute } from './ProtectedRoute'
import { LandingPage } from '@/pages/LandingPage'
import {
  ForgotPasswordPage,
  LoginPage,
  ProfileSetupPage,
  RegisterPage,
  ResetPasswordPage,
  UserTypePage,
  VerifyEmailPage,
  WelcomePage,
} from '@/pages/auth/AuthPages'

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
    path: '/auth',
    element: (
      <LandingShell>
        <Outlet />
      </LandingShell>
    ),
    children: [
      { index: true, element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: 'verify-email', element: <VerifyEmailPage /> },
      { path: 'welcome', element: <WelcomePage /> },
      { path: 'profile', element: <ProfileSetupPage /> },
      { path: 'user-type', element: <UserTypePage /> },
    ],
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
