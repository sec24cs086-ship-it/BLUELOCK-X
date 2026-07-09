import { useEffect, useMemo, useState } from 'react'
import { addManualProduct, getExtractedProducts, removeProduct, updateProduct } from '@/features/workspace/services/product.service'
import type { ExtractedProduct, ProductFiltersState } from '@/features/workspace/types/product.types'

const initialFilters: ProductFiltersState = {
  search: '',
  category: 'All',
  confidence: 'All',
  sortBy: 'confidence',
  sortDirection: 'desc',
  viewMode: 'table',
}

export function useProductExtraction() {
  const [products, setProducts] = useState<ExtractedProduct[]>([])
  const [filters, setFilters] = useState<ProductFiltersState>(initialFilters)
  const [editingProduct, setEditingProduct] = useState<ExtractedProduct | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadProducts() {
      const data = await getExtractedProducts()
      if (isMounted) {
        setProducts(data)
      }
    }

    void loadProducts()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredProducts = useMemo(() => {
    const nextProducts = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase())
      const matchesCategory = filters.category === 'All' || product.category === filters.category
      const matchesConfidence =
        filters.confidence === 'All' ||
        (filters.confidence === 'High' && product.confidence >= 90) ||
        (filters.confidence === 'Medium' && product.confidence >= 80 && product.confidence < 90) ||
        (filters.confidence === 'Low' && product.confidence < 80)

      return matchesSearch && matchesCategory && matchesConfidence
    })

    return [...nextProducts].sort((left, right) => {
      const sortValue = filters.sortBy === 'price' ? left.unitPrice - right.unitPrice : left.confidence - right.confidence
      return filters.sortDirection === 'asc' ? sortValue : -sortValue
    })
  }, [filters, products])

  async function saveEdit(product: ExtractedProduct) {
    const updated = await updateProduct(product)
    setProducts((current) => current.map((item) => (item.id === updated.id ? updated : item)))
    setEditingProduct(null)
  }

  async function deleteProduct(productId: string) {
    await removeProduct(productId)
    setProducts((current) => current.filter((item) => item.id !== productId))
  }

  async function addProduct(product: ExtractedProduct) {
    const created = await addManualProduct(product)
    setProducts((current) => [created, ...current])
    setEditingProduct(null)
  }

  return {
    products: filteredProducts,
    filters,
    setFilters,
    editingProduct,
    setEditingProduct,
    saveEdit,
    deleteProduct,
    addProduct,
  }
}
