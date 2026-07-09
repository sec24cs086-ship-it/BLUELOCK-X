import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import type { ExtractedProduct, ProductCategory } from '@/features/workspace/types/product.types'

type ProductEditorProps = {
  product: ExtractedProduct
  onChange: (product: ExtractedProduct) => void
  onSave: () => void
  onCancel: () => void
}

const categories: ProductCategory[] = ['Groceries', 'Beverages', 'Household', 'Produce', 'Bakery', 'Other']

export function ProductEditor({ product, onChange, onSave, onCancel }: ProductEditorProps) {
  return (
    <div className="rounded-[20px] border border-slate-800/80 bg-slate-900/70 p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          value={product.name}
          onChange={(event) => onChange({ ...product, name: event.target.value })}
          placeholder="Product name"
        />
        <Select
          value={product.category}
          onChange={(event) => onChange({ ...product, category: event.target.value as ProductCategory })}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Input
          type="number"
          value={product.quantity}
          onChange={(event) => onChange({ ...product, quantity: Number(event.target.value) })}
        />
        <Input
          type="number"
          value={product.unitPrice}
          onChange={(event) => onChange({ ...product, unitPrice: Number(event.target.value) })}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="button" onClick={onSave}>
          Save
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
