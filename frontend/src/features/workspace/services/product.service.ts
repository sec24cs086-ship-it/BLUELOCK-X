import productsData from '@/features/workspace/mock/extracted-products.json'
import type { ExtractedProduct } from '@/features/workspace/types/product.types'

const products = [...(productsData as ExtractedProduct[])]

export async function getExtractedProducts(): Promise<ExtractedProduct[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve([...products]), 250)
  })
}

export async function updateProduct(product: ExtractedProduct): Promise<ExtractedProduct> {
  return new Promise((resolve) => {
    const index = products.findIndex((item) => item.id === product.id)
    if (index >= 0) {
      products[index] = product
    }
    window.setTimeout(() => resolve(product), 250)
  })
}

export async function removeProduct(productId: string): Promise<void> {
  return new Promise((resolve) => {
    const index = products.findIndex((item) => item.id === productId)
    if (index >= 0) {
      products.splice(index, 1)
    }
    window.setTimeout(() => resolve(), 250)
  })
}

export async function addManualProduct(product: ExtractedProduct): Promise<ExtractedProduct> {
  return new Promise((resolve) => {
    products.unshift(product)
    window.setTimeout(() => resolve(product), 250)
  })
}
