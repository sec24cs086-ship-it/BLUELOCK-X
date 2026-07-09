import { Badge } from '@/components/ui/badge'
import type { RecommendationPriorityLevel } from '@/types/recommendation.types'

interface RecommendationPriorityProps {
  priority: RecommendationPriorityLevel
}

const priorityStyles: Record<RecommendationPriorityLevel, 'success' | 'warning' | 'secondary'> = {
  High: 'success',
  Medium: 'warning',
  Low: 'secondary',
}

export function RecommendationPriority({ priority }: RecommendationPriorityProps) {
  return <Badge variant={priorityStyles[priority]}>{priority} priority</Badge>
}
