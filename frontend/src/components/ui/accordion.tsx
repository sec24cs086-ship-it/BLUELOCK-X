import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

interface AccordionItemProps {
  title: string
  description: string
  defaultOpen?: boolean
}

export function AccordionItem({ title, description, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950/70 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-semibold text-slate-100 transition hover:bg-slate-900/80"
      >
        <span>{title}</span>
        <ChevronDown className={cn('h-5 w-5 transition-transform duration-200', isOpen && 'rotate-180')} />
      </button>
      {isOpen ? <div className="border-t border-slate-800 px-6 py-4 text-sm text-slate-400">{description}</div> : null}
    </div>
  )
}
