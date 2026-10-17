'use client'

import { Tabs as RadixTabs } from 'radix-ui'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface TabItem {
  value: string
  label: string
  content: ReactNode
}

export function Tabs({
  items,
  defaultValue,
  label,
  className,
}: {
  items: TabItem[]
  defaultValue?: string
  label: string
  className?: string
}) {
  return (
    <RadixTabs.Root
      defaultValue={defaultValue ?? items[0]?.value}
      className={cn('w-full', className)}
    >
      <RadixTabs.List
        aria-label={label}
        className="flex items-center gap-8 overflow-x-auto border-b border-river/30 pb-3"
      >
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            className="relative cursor-pointer pb-1 font-display text-lg text-ink-soft transition-colors select-none hover:text-ink focus-visible:outline-2 focus-visible:outline-focus data-[state=active]:font-medium data-[state=active]:text-brand data-[state=active]:after:absolute data-[state=active]:after:inset-x-0 data-[state=active]:after:bottom-[-13px] data-[state=active]:after:h-[2px] data-[state=active]:after:bg-brand data-[state=active]:after:content-[''] sm:text-xl"
          >
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {items.map((item) => (
        <RadixTabs.Content
          key={item.value}
          value={item.value}
          className="pt-4 focus-visible:outline-none"
        >
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  )
}
