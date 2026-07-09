import { request } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import uploadResponse from '@/features/workspace/mock/upload-response.json'
import type { ApiResponseEnvelope } from '@/types/api.types'
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

  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await request<ApiResponseEnvelope<UploadResult>>({
      method: 'POST',
      url: API_ENDPOINTS.upload,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (response?.success === false) {
      throw new Error(response.message ?? 'Unable to upload receipt')
    }

    return {
      ...(response.data ?? mockUploadResponse),
      fileName: file.name,
      size: file.size,
      status: 'success',
    }
  } catch (error) {
    console.error('FastAPI upload failed', error)
    throw error instanceof Error ? error : new Error('Unable to upload receipt right now.')
  }
}
