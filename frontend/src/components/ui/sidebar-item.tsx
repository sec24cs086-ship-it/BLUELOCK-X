import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

interface SidebarItemProps {
  label: string
  href: string
  icon: ReactNode
  active?: boolean
}

export function SidebarItem({ label, href, icon, active = false }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all duration-200',
        active ? 'bg-emerald-500/15 text-emerald-300 shadow-sm' : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-100',
      )}
    >
      <span className="text-slate-300">{icon}</span>
      <span>{label}</span>
    </Link>
  )
}
