import { type ChangeEvent, type LabelHTMLAttributes, useState } from 'react'
import { UploadCloud } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ReceiptUploadProps extends LabelHTMLAttributes<HTMLLabelElement> {
  onFileSelect: (file: File) => void
}

export function ReceiptUpload({ onFileSelect, className, ...props }: ReceiptUploadProps) {
  const [filename, setFilename] = useState<string | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFilename(file.name)
      onFileSelect(file)
    }
  }

  return (
    <label className={cn('group flex cursor-pointer flex-col rounded-[28px] border border-slate-800 bg-slate-950/80 px-6 py-8 transition hover:border-slate-700', className)} {...props}>
      <input type="file" accept=".png,.jpg,.jpeg,.pdf" className="sr-only" onChange={handleChange} />
      <UploadCloud className="h-10 w-10 text-emerald-400 transition group-hover:text-emerald-300" />
      <p className="mt-4 text-lg font-semibold text-slate-100">Upload receipt</p>
      <p className="mt-2 text-sm text-slate-400">Drag and drop or click to select your receipt file.</p>
      {filename ? <div className="mt-4 rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">Selected: {filename}</div> : null}
    </label>
  )
}
