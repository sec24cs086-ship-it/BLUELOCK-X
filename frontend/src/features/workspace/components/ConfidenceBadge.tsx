import { Badge } from '@/components/ui/badge'
import { AlertTriangle } from 'lucide-react'

type ConfidenceBadgeProps = {
  confidence: number
}

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  if (confidence >= 95) {
    return (
      <Badge variant="success" className="gap-1">
        Ready
      </Badge>
    )
  }

  if (confidence >= 80) {
    return (
      <Badge variant="warning" className="gap-1">
        Verify
      </Badge>
    )
  }

  return (
    <Badge variant="danger" className="gap-1">
      <AlertTriangle className="h-3.5 w-3.5" />
      Needs Review
    </Badge>
  )
}
