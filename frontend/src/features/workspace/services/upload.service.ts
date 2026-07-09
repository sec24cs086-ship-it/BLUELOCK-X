import uploadResponse from '@/features/workspace/mock/upload-response.json'
import type { UploadResult } from '@/features/workspace/types/upload.types'

const mockUploadResponse = uploadResponse as UploadResult

export const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024

const SUPPORTED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'pdf']

function isSupportedFile(file: File) {
  const extension = file.name.toLowerCase().split('.').pop()
  const hasSupportedExtension = extension ? SUPPORTED_EXTENSIONS.includes(extension) : false
  const hasSupportedMimeType = ['image/png', 'image/jpeg', 'application/pdf'].includes(file.type)

  return hasSupportedExtension || hasSupportedMimeType
}

export async function uploadReceipt(file: File): Promise<UploadResult> {
  const isSupported = isSupportedFile(file)

  if (!isSupported) {
    throw new Error('Unsupported file type. Please upload a PNG, JPG, JPEG, or PDF receipt.')
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    throw new Error('File exceeds the 10 MB limit. Please choose a smaller receipt.')
  }

  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        ...mockUploadResponse,
        fileName: file.name,
        size: file.size,
        status: 'success',
      })
    }, 1100)
  })
}
