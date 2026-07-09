import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { LayoutGrid, Table2 } from 'lucide-react'
import type { ProductFiltersState, ProductCategory } from '@/features/workspace/types/product.types'

type ProductFiltersProps = {
  filters: ProductFiltersState
  onFiltersChange: (filters: ProductFiltersState) => void
}

const categories: Array<ProductCategory | 'All'> = ['All', 'Groceries', 'Beverages', 'Household', 'Produce', 'Bakery', 'Other']
const confidenceLevels: Array<ProductFiltersState['confidence']> = ['All', 'High', 'Medium', 'Low']

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr]">
        <Input
          placeholder="Search products"
          value={filters.search}
          onChange={(event) => onFiltersChange({ ...filters, search: event.target.value })}
        />
        <Select
          value={filters.category}
          onChange={(event) => onFiltersChange({ ...filters, category: event.target.value as ProductCategory | 'All' })}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Select
          value={filters.confidence}
          onChange={(event) => onFiltersChange({ ...filters, confidence: event.target.value as ProductFiltersState['confidence'] })}
        >
          {confidenceLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </Select>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={filters.viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFiltersChange({ ...filters, viewMode: 'table' })}
          >
            <Table2 className="mr-2 h-4 w-4" />
            Table
          </Button>
          <Button
            type="button"
            variant={filters.viewMode === 'card' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFiltersChange({ ...filters, viewMode: 'card' })}
          >
            <LayoutGrid className="mr-2 h-4 w-4" />
            Cards
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select
          value={filters.sortBy}
          onChange={(event) => onFiltersChange({ ...filters, sortBy: event.target.value as ProductFiltersState['sortBy'] })}
        >
          <option value="confidence">Sort by confidence</option>
          <option value="price">Sort by price</option>
        </Select>
        <Select
          value={filters.sortDirection}
          onChange={(event) => onFiltersChange({ ...filters, sortDirection: event.target.value as ProductFiltersState['sortDirection'] })}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </Select>
      </div>
    </div>
  )
}
