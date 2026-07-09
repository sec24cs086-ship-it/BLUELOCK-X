import { Home, ScanLine, Sparkles, BarChart3, ShieldCheck, Bell } from 'lucide-react'

export const navigationItems = [
  { id: 'overview', label: 'Overview', href: '/app', icon: Home },
  { id: 'receipts', label: 'Receipts', href: '/app/receipts', icon: ScanLine },
  { id: 'insights', label: 'Insights', href: '/app/insights', icon: Sparkles },
  { id: 'analytics', label: 'Analytics', href: '/app/analytics', icon: BarChart3 },
  { id: 'security', label: 'Security', href: '/app/security', icon: ShieldCheck },
  { id: 'notifications', label: 'Notifications', href: '/app/notifications', icon: Bell },
] as const
