import { Badge } from '@/components/ui/badge'

type CategoryBadgeProps = {
  category: string
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return <Badge variant="secondary">{category}</Badge>
}
