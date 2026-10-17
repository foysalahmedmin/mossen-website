'use client'

import { Accordion as RadixAccordion } from 'radix-ui'
import type { ReactNode } from 'react'
import { CaretDown } from '@/components/icons'
import { cn } from '@/lib/cn'

export interface AccordionItem {
  value: string
  title: string
  content: ReactNode
}

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  return (
    <RadixAccordion.Root
      type="single"
      collapsible
      className={cn('w-full divide-y divide-river/25', className)}
    >
      {items.map((item) => (
        <RadixAccordion.Item key={item.value} value={item.value} className="py-2">
          <RadixAccordion.Header className="m-0">
            <RadixAccordion.Trigger className="group flex w-full cursor-pointer items-center justify-between py-3 text-left font-display text-lg font-medium text-ink select-none focus-visible:outline-2 focus-visible:outline-focus">
              <span>{item.title}</span>
              <span
                aria-hidden="true"
                className="pebble flex h-8 w-8 shrink-0 items-center justify-center bg-surface/70 text-ink-soft transition-transform duration-[420ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:text-ink group-data-[state=open]:rotate-180"
              >
                <CaretDown size={16} aria-hidden="true" />
              </span>
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className="overflow-hidden pb-4 font-text text-sm leading-relaxed text-ink-soft transition-all duration-[420ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]">
            <div className="pt-1">{item.content}</div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  )
}
