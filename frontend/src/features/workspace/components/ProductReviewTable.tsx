import { motion } from 'framer-motion'
import { PencilLine, Trash2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { ExtractedProduct } from '@/features/workspace/types/product.types'
import { CategoryBadge } from './CategoryBadge'
import { ConfidenceBadge } from './ConfidenceBadge'

type ProductReviewTableProps = {
  products: ExtractedProduct[]
  onEdit: (product: ExtractedProduct) => void
  onDelete: (productId: string) => void
}

export function ProductReviewTable({ products, onEdit, onDelete }: ProductReviewTableProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-900/70 text-sm font-semibold uppercase text-slate-300">
                    {product.name.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">{product.name}</p>
                    <p className="text-xs text-slate-400">{product.source}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <CategoryBadge category={product.category} />
              </TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>${product.unitPrice.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <ConfidenceBadge confidence={product.confidence} />
                  {product.confidence < 80 ? <AlertTriangle className="h-4 w-4 text-red-300" /> : null}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => onEdit(product)}>
                    <PencilLine className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => onDelete(product.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  )
}
