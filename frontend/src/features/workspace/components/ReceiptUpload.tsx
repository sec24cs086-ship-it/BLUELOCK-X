import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useReceiptUpload } from '@/features/workspace/hooks/useReceiptUpload'
import { UploadEmptyState } from './UploadEmptyState'
import { UploadError } from './UploadError'
import { UploadProgress } from './UploadProgress'
import { UploadSuccess } from './UploadSuccess'

export function ReceiptUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { state, isDragging, handleDragOver, handleDragLeave, handleDrop, handleFileSelection, resetUpload } = useReceiptUpload()

  function openFilePicker() {
    inputRef.current?.click()
  }

  return (
    <Card className="rounded-[24px] border-slate-800/80 bg-slate-950/70 p-0">
      <CardHeader className="pb-3">
        <CardTitle>Receipt Upload</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`rounded-[24px] border ${isDragging ? 'border-emerald-400/60 bg-emerald-500/10' : 'border-slate-800/80 bg-slate-900/70'} p-2 transition-colors duration-200`}
        >
          <input ref={inputRef} type="file" accept=".png,.jpg,.jpeg,.pdf" className="hidden" onChange={handleFileSelection} />

          {state.status === 'idle' && (
            <UploadEmptyState isDragging={isDragging} onBrowse={openFilePicker} onCameraPlaceholder={() => undefined} />
          )}

          {state.status === 'uploading' && state.fileName && (
            <UploadProgress fileName={state.fileName} progress={state.progress} />
          )}

          {state.status === 'success' && state.result && (
            <UploadSuccess result={state.result} onReset={resetUpload} />
          )}

          {state.status === 'error' && state.error && <UploadError message={state.error} onRetry={resetUpload} />}
        </motion.div>
      </CardContent>
    </Card>
  )
}
