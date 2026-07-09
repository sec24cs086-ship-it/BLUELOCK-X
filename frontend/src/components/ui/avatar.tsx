import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name?: string
  src?: string
}

function getInitials(name?: string) {
  if (!name) return 'EL'
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({ className, name, src, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-slate-800 bg-slate-900 text-sm font-semibold text-slate-100 shadow-sm', className)}
    {...props}
  >
    {src ? <img src={src} alt={name ?? 'Avatar'} className="h-full w-full object-cover" /> : getInitials(name)}
  </div>
))
Avatar.displayName = 'Avatar'
