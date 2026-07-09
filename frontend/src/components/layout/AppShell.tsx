import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'

export function AppShell() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 lg:px-6">
        <div className="flex flex-1 overflow-hidden rounded-[28px] border border-slate-800/80 bg-slate-950/70 shadow-[0_30px_80px_rgba(2,6,23,0.35)] backdrop-blur-2xl">
          <Sidebar />
          <div className="flex flex-1 flex-col">
            <TopNav />
            <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
