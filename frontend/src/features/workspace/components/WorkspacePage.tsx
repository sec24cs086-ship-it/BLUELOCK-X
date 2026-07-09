import { motion } from 'framer-motion'
import { WorkspaceContent } from './WorkspaceContent'
import { WorkspaceHeader } from './WorkspaceHeader'

export function WorkspacePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-6">
      <WorkspaceHeader />
      <WorkspaceContent />
    </motion.div>
  )
}
