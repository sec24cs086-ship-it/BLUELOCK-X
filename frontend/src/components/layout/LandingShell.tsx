import { Logo } from '@/components/ui/logo'
import { NavbarActions } from '@/components/ui/navbar-actions'
import { Button } from '@/components/ui/button'

export function LandingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.08),_transparent_35%),linear-gradient(180deg,_#020617_0%,_#081021_100%)] text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10 rounded-3xl bg-slate-900/80 p-2 text-emerald-300" />
            <div>
              <p className="text-base font-semibold tracking-[0.08em] uppercase text-emerald-300">EcoLens AI</p>
            </div>
          </div>
          <NavbarActions>
            <Button variant="ghost" size="sm">Why EcoLens</Button>
            <Button variant="ghost" size="sm">Solutions</Button>
            <Button variant="default" size="sm">Get early access</Button>
          </NavbarActions>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
