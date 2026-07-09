import { navigationItems } from '@/constants/navigation'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { Sparkles } from 'lucide-react'

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="hidden w-72 flex-col border-r border-slate-800/80 bg-slate-950/70 p-6 lg:flex">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
          <Sparkles size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-100">EcoLens AI</p>
          <p className="text-xs text-slate-400">Carbon intelligence</p>
        </div>
      </div>

      <nav className="mt-8 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const active = location.pathname === item.href

          return (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all',
                active ? 'bg-emerald-500/15 text-emerald-300 shadow-sm' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100',
              )}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
