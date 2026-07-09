import { request } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import productsData from '@/features/workspace/mock/extracted-products.json'
import type { ApiResponseEnvelope } from '@/types/api.types'
import type { ExtractedProduct } from '@/features/workspace/types/product.types'

const products = [...(productsData as ExtractedProduct[])]

export async function getExtractedProducts(): Promise<ExtractedProduct[]> {
  try {
    const response = await request<ApiResponseEnvelope<ExtractedProduct[]>>({
      method: 'POST',
      url: API_ENDPOINTS.extractProducts,
    })

    if (response?.success === false) {
      throw new Error(response.message ?? 'Unable to load extracted products')
    }

    return response?.data ?? [...products]
  } catch (error) {
    console.error('FastAPI product extraction failed', error)
    return [...products]
  }
}

export async function updateProduct(product: ExtractedProduct): Promise<ExtractedProduct> {
  try {
    const response = await request<ApiResponseEnvelope<ExtractedProduct>>({
      method: 'PATCH',
      url: API_ENDPOINTS.extractProducts,
      data: product,
    })

    if (response?.success === false) {
      throw new Error(response.message ?? 'Unable to update product')
    }

    return response?.data ?? product
  } catch (error) {
    console.error('FastAPI product update failed', error)
    return product
  }
}

export async function removeProduct(productId: string): Promise<void> {
  try {
    await request<ApiResponseEnvelope<void>>({
      method: 'DELETE',
      url: API_ENDPOINTS.extractProducts,
      data: { id: productId },
    })
  } catch (error) {
    console.error('FastAPI product removal failed', error)
  }
}

export async function addManualProduct(product: ExtractedProduct): Promise<ExtractedProduct> {
  try {
    const response = await request<ApiResponseEnvelope<ExtractedProduct>>({
      method: 'POST',
      url: API_ENDPOINTS.extractProducts,
      data: product,
    })

    if (response?.success === false) {
      throw new Error(response.message ?? 'Unable to add product')
    }

    return response?.data ?? product
  } catch (error) {
    console.error('FastAPI manual product creation failed', error)
    return product
  }
}
