import { Bell, Search, SunMedium } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TopNav() {
  return (
    <header className="flex items-center justify-between border-b border-slate-800/80 px-4 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-2 text-slate-400">
          <Search size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-100">Workspace</p>
          <p className="text-xs text-slate-500">Secure sustainability analytics</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="rounded-full p-2.5">
          <SunMedium size={16} />
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full p-2.5">
          <Bell size={16} />
        </Button>
      </div>
    </header>
  )
}
