import { motion } from 'framer-motion'
import { AlertTriangle, PencilLine, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ExtractedProduct } from '@/features/workspace/types/product.types'
import { CategoryBadge } from './CategoryBadge'
import { ConfidenceBadge } from './ConfidenceBadge'

type ProductCardProps = {
  product: ExtractedProduct
  onEdit?: (product: ExtractedProduct) => void
  onDelete?: (productId: string) => void
  isEditing?: boolean
  draft?: ExtractedProduct | null
  onStartEdit?: (product: ExtractedProduct) => void
  onCancelEdit?: () => void
  onSaveEdit?: (product: ExtractedProduct) => void
  onDraftChange?: (product: ExtractedProduct) => void
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-[22px] border border-slate-800/80 bg-slate-950/70 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-900/70 text-sm font-semibold uppercase text-slate-300">
          {product.name.slice(0, 2)}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-base font-semibold text-slate-100">{product.name}</h4>
            <ConfidenceBadge confidence={product.confidence} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <CategoryBadge category={product.category} />
            {product.confidence < 80 ? <AlertTriangle className="h-4 w-4 text-red-300" /> : null}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-[18px] border border-slate-800/80 bg-slate-900/70 p-4 text-sm text-slate-300">
        <div className="flex items-center justify-between">
          <span>Quantity</span>
          <span className="font-semibold text-slate-100">{product.quantity}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span>Unit price</span>
          <span className="font-semibold text-slate-100">${product.unitPrice.toFixed(2)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span>Source</span>
          <span className="font-semibold text-slate-100">{product.source}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="button" variant="outline" size="sm" onClick={() => onEdit?.(product)}>
          <PencilLine className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => onDelete?.(product.id)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </motion.div>
  )
}
