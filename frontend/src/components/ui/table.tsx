import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

export const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/70 shadow-sm">
    <table ref={ref} className={cn('w-full border-collapse text-left text-sm', className)} {...props} />
  </div>
))
Table.displayName = 'Table'

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('bg-slate-950/90', className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('divide-y divide-slate-800', className)} {...props} />
))
TableBody.displayName = 'TableBody'

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn('transition-colors duration-200 hover:bg-slate-900/80', className)} {...props} />
))
TableRow.displayName = 'TableRow'

export const TableHead = forwardRef<HTMLTableCellElement, HTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <th ref={ref} className={cn('border-b border-slate-800/80 px-4 py-3 text-left text-xs uppercase tracking-[0.16em] text-slate-500', className)} {...props} />
))
TableHead.displayName = 'TableHead'

export const TableCell = forwardRef<HTMLTableCellElement, HTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn('px-4 py-4 text-slate-100', className)} {...props} />
))
TableCell.displayName = 'TableCell'
