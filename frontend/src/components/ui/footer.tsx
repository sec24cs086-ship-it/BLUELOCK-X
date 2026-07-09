import { Badge } from '@/components/ui/badge'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800/70 bg-slate-950/90 px-4 py-12 text-slate-400 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="secondary">EcoLens AI</Badge>
            <p className="text-sm text-slate-500">Premium receipt sustainability intelligence.</p>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-400">
            EcoLens helps retailers, brands, and sustainability teams understand purchase impacts through receipt-level emissions insights and lower-carbon recommendations.
          </p>
          <p className="text-sm text-slate-500">© 2026 EcoLens AI. All rights reserved.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Product</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>Features</li>
              <li>Integrations</li>
              <li>Roadmap</li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Resources</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>Case studies</li>
              <li>Documentation</li>
              <li>Support</li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Company</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
