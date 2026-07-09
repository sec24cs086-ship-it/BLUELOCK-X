import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        default: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 hover:-translate-y-0.5 hover:shadow-[0_22px_68px_-18px_rgba(16,185,129,0.5)]',
        secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 hover:-translate-y-0.5',
        outline: 'border border-slate-700 bg-transparent text-slate-100 hover:bg-slate-800 hover:-translate-y-0.5',
        ghost: 'bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white hover:-translate-y-0.5',
        danger: 'bg-red-500 text-white hover:bg-red-400 hover:-translate-y-0.5',
        success: 'bg-green-500 text-white hover:bg-green-400 hover:-translate-y-0.5',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
))

Button.displayName = 'Button'
