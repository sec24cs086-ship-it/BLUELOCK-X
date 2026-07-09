import { motion } from 'framer-motion'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ExtractedProduct } from '@/features/workspace/types/product.types'
import { ProductCard } from './ProductCard'

type ProductListProps = {
  products: ExtractedProduct[]
  editingId: string | null
  draft: ExtractedProduct | null
  onStartEdit: (product: ExtractedProduct) => void
  onCancelEdit: () => void
  onSaveEdit: (product: ExtractedProduct) => void
  onDelete: (productId: string) => void
  onDraftChange: (product: ExtractedProduct) => void
  onAddManual: () => void
}

export function ProductList({ products, editingId, draft, onStartEdit, onCancelEdit, onSaveEdit, onDelete, onDraftChange, onAddManual }: ProductListProps) {
  if (products.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-[22px] border border-dashed border-slate-700/80 bg-slate-900/70 p-6 text-center text-sm text-slate-400">
        No products match the current filters.
      </motion.div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button type="button" variant="outline" size="sm" onClick={onAddManual}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add manual product
        </Button>
      </div>

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isEditing={editingId === product.id}
          draft={draft}
          onStartEdit={onStartEdit}
          onCancelEdit={onCancelEdit}
          onSaveEdit={onSaveEdit}
          onDelete={onDelete}
          onDraftChange={onDraftChange}
        />
      ))}
    </div>
  )
}
