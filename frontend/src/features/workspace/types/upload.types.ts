export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

export interface UploadResult {
  id: string
  fileName: string
  size: number
  status: 'success'
  message: string
  uploadedAt: string
}

export interface UploadState {
  status: UploadStatus
  progress: number
  fileName?: string
  error?: string
  result?: UploadResult
}
