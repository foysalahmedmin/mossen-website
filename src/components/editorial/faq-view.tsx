'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MagnifyingGlass, Sparkle } from '@/components/icons'
import { Accordion, Button } from '@/components/ui'
import { routes } from '@/config/routes'
import type { FaqItem } from '@/domain'

export function FaqView({ items = [] }: { items: FaqItem[] }) {
  const [selectedGroup, setSelectedGroup] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Derive unique groups
  const groups = useMemo(() => {
    const set = new Set<string>()
    items.forEach((item) => set.add(item.group))
    return ['All', ...Array.from(set)]
  }, [items])

  // Filter items by category and search query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesGroup = selectedGroup === 'All' || item.group === selectedGroup
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesGroup && matchesSearch
    })
  }, [items, selectedGroup, searchQuery])

  // Map to Accordion items
  const accordionItems = useMemo(() => {
    return filteredItems.map((item) => ({
      value: item.id,
      title: item.question,
      content: (
        <div className="pt-2">
          <p className="font-text text-sm leading-relaxed text-ink-soft">{item.answer}</p>
          <div className="mt-3">
            <span className="inline-block rounded-md bg-stone-100 px-3 py-0.5 text-[10px] text-ink-faint tabular-nums">
              Topic: {item.group}
            </span>
          </div>
        </div>
      ),
    }))
  }, [filteredItems])

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-brand/10 px-3 py-1 text-xs font-semibold text-brand tabular-nums">
          <Sparkle size={12} />
          Living Wardrobe Wisdom & FAQ
        </span>
        <h1 className="mt-3 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-text text-base text-ink-soft md:text-lg">
          Answers to queries regarding Baltic flax cultivation, natural plant dyes, lanolin wool
          care, and zero-waste delivery.
        </p>

        {/* Search Bar */}
        <div className="relative mx-auto mt-8 max-w-lg">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-ink-faint">
            <MagnifyingGlass size={18} />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or fiber topics..."
            className="h-12 w-full rounded-md border border-stone-200 bg-white pr-5 pl-11 font-text text-sm text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-focus"
          />
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`rounded-md px-4 py-1.5 text-xs font-semibold tabular-nums transition ${
                selectedGroup === group
                  ? 'bg-brand text-on-brand'
                  : 'border border-stone-200/70 bg-[#fcfbf7] text-ink-soft hover:bg-white hover:text-ink'
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Card */}
      <div className="rounded-md border border-stone-200/80 bg-[#fbf9f5] p-6 md:p-10">
        <h2 className="sr-only">Questions</h2>
        {accordionItems.length > 0 ? (
          <Accordion items={accordionItems} />
        ) : (
          <div className="py-12 text-center">
            <p className="font-display text-lg font-normal text-ink">No matching questions found</p>
            <p className="mt-2 font-text text-sm text-ink-soft">
              Try adjusting your query or resetting category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedGroup('All')
              }}
              className="mt-4 text-xs font-semibold text-brand tabular-nums hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Sanctuary Banner */}
      <div className="mt-12 rounded-md border border-stone-200/80 bg-[#fcfbf7] p-8 text-center md:flex md:items-center md:justify-between md:text-left">
        <div>
          <h3 className="font-display text-xl font-normal text-ink">Seeking Personal Guidance?</h3>
          <p className="mt-1 font-text text-sm text-ink-soft">
            Our weaving specialists and client advisers are here to assist with garment care and fit
            questions.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <Button asChild>
            <Link href={routes.contact}>
              Write to Concierge
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
