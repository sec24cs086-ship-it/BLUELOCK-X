import { LeftPanel } from './LeftPanel'
import { CenterPanel } from './CenterPanel'
import { RightPanel } from './RightPanel'

export function WorkspaceContent() {
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,0.3fr)_minmax(0,0.7fr)] xl:grid-cols-[minmax(0,0.25fr)_minmax(0,0.5fr)_minmax(0,0.25fr)]">
      <div className="md:col-span-1 xl:col-span-1">
        <LeftPanel />
      </div>

      <div className="md:col-span-1 xl:col-span-1">
        <CenterPanel />
      </div>

      <div className="md:col-span-2 xl:col-span-1">
        <RightPanel />
      </div>
    </div>
  )
}
