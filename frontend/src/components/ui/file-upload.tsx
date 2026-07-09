import { type ChangeEvent, type LabelHTMLAttributes } from 'react'
import { UploadCloud } from 'lucide-react'
import { cn } from '@/utils/cn'

interface FileUploadProps extends LabelHTMLAttributes<HTMLLabelElement> {
  accept?: string
  onFileSelect: (file: File) => void
  disabled?: boolean
}

export function FileUpload({ accept = '.png,.jpg,.jpeg,.pdf', onFileSelect, disabled, className, ...props }: FileUploadProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) onFileSelect(file)
  }

  return (
    <label className={cn('group flex cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-800 bg-slate-950/80 px-6 py-10 text-center transition hover:border-slate-700', className)} {...props}>
      <input type="file" accept={accept} className="sr-only" disabled={disabled} onChange={handleChange} />
      <UploadCloud className="h-10 w-10 text-emerald-400 transition group-hover:text-emerald-300" />
      <p className="mt-4 text-sm font-semibold text-slate-100">Upload receipt</p>
      <p className="mt-1 text-sm text-slate-400">PNG, JPG, JPEG, or PDF</p>
    </label>
  )
}
