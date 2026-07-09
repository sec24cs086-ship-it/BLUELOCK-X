import { motion } from 'framer-motion'
import { WorkspaceSidebar } from './WorkspaceSidebar'

export function LeftPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="h-full"
    >
      <WorkspaceSidebar />
    </motion.section>
  )
}
