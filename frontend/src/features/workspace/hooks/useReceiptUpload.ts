import { useEffect, useRef, useState } from 'react'
import { uploadReceipt } from '@/features/workspace/services/upload.service'
import type { UploadState } from '@/features/workspace/types/upload.types'

const initialState: UploadState = {
  status: 'idle',
  progress: 0,
}

export function useReceiptUpload() {
  const [state, setState] = useState<UploadState>(initialState)
  const [isDragging, setIsDragging] = useState(false)
  const progressTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (progressTimer.current !== null) {
        window.clearInterval(progressTimer.current)
      }
    }
  }, [])

  function clearProgressTimer() {
    if (progressTimer.current !== null) {
      window.clearInterval(progressTimer.current)
      progressTimer.current = null
    }
  }

  function resetUpload() {
    clearProgressTimer()
    setState(initialState)
    setIsDragging(false)
  }

  async function uploadFile(file?: File | null) {
    if (!file) {
      return
    }

    clearProgressTimer()
    setState({ status: 'uploading', progress: 0, fileName: file.name })

    progressTimer.current = window.setInterval(() => {
      setState((current) => {
        if (current.status !== 'uploading') {
          return current
        }

        return {
          ...current,
          progress: Math.min(current.progress + 12, 92),
        }
      })
    }, 140)

    try {
      const result = await uploadReceipt(file)
      clearProgressTimer()
      setState({ status: 'success', progress: 100, fileName: result.fileName, result })
    } catch (error) {
      clearProgressTimer()
      setState({
        status: 'error',
        progress: 0,
        fileName: file.name,
        error: error instanceof Error ? error.message : 'Unable to upload receipt right now.',
      })
    }
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)

    const droppedFile = event.dataTransfer.files?.[0]
    void uploadFile(droppedFile)
  }

  function handleFileSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0]
    void uploadFile(selectedFile)
  }

  return {
    state,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelection,
    resetUpload,
  }
}
