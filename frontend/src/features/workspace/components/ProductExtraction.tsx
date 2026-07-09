import { motion } from 'framer-motion'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useProductExtraction } from '@/features/workspace/hooks/useProductExtraction'
import { ProductCard } from './ProductCard'
import { ProductEditorModal } from './ProductEditorModal'
import { ProductFilters } from './ProductFilters'
import { ProductReviewTable } from './ProductReviewTable'

export function ProductExtraction() {
  const { products, filters, setFilters, editingProduct, setEditingProduct, saveEdit, deleteProduct, addProduct } = useProductExtraction()

  function handleAddManualProduct() {
    const nextProduct = {
      id: `manual-${Date.now()}`,
      name: 'New Product',
      category: 'Other' as const,
      confidence: 70,
      quantity: 1,
      unitPrice: 0,
      source: 'manual' as const,
    }

    void addProduct(nextProduct)
  }

  return (
    <Card className="rounded-[24px] border-slate-800/80 bg-slate-950/70 p-0">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle>Product Extraction</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={handleAddManualProduct}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add manual product
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <ProductFilters filters={filters} onFiltersChange={setFilters} />

          {filters.viewMode === 'table' ? (
            <ProductReviewTable products={products} onEdit={setEditingProduct} onDelete={deleteProduct} />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onEdit={setEditingProduct} onDelete={deleteProduct} />
              ))}
            </div>
          )}

          <ProductEditorModal
            open={Boolean(editingProduct)}
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSave={saveEdit}
          />
        </motion.div>
      </CardContent>
    </Card>
  )
}
