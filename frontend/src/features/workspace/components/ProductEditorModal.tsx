import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import type { ExtractedProduct, ProductCategory } from '@/features/workspace/types/product.types'

type ProductEditorModalProps = {
  open: boolean
  product: ExtractedProduct | null
  onClose: () => void
  onSave: (product: ExtractedProduct) => void
}

const categories: ProductCategory[] = ['Groceries', 'Beverages', 'Household', 'Produce', 'Bakery', 'Other']

export function ProductEditorModal({ open, product, onClose, onSave }: ProductEditorModalProps) {
  const [draft, setDraft] = useState<ExtractedProduct | null>(product)

  const resolvedDraft = useMemo(() => {
    if (!open) {
      return draft
    }

    return product ?? draft
  }, [draft, open, product])

  if (!open || !resolvedDraft) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onClose} title="Edit product" description="Update the product details before handing them off to the carbon engine.">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          value={resolvedDraft.name}
          onChange={(event) => setDraft({ ...resolvedDraft, name: event.target.value })}
          placeholder="Product name"
        />
        <Input
          type="number"
          value={resolvedDraft.quantity}
          onChange={(event) => setDraft({ ...resolvedDraft, quantity: Number(event.target.value) })}
        />
        <Select
          value={resolvedDraft.category}
          onChange={(event) => setDraft({ ...resolvedDraft, category: event.target.value as ProductCategory })}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Input
          type="number"
          value={resolvedDraft.unitPrice}
          onChange={(event) => setDraft({ ...resolvedDraft, unitPrice: Number(event.target.value) })}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="button" onClick={() => onSave(resolvedDraft)}>
          Save changes
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Dialog>
  )
}
