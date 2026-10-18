'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkle } from '@/components/icons'
import { routes } from '@/config/routes'
import type { JournalPost } from '@/domain'

function ClockIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

export function JournalView({ posts }: { posts: JournalPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-normal text-ink">The Botanical Journal</h1>
        <p className="mt-4 font-text text-ink-soft">
          Quiet essays are being gathered from our harvests.
        </p>
      </div>
    )
  }

  const [featured, ...rest] = posts

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-brand/10 px-3 py-1 text-xs font-semibold text-brand tabular-nums">
          <Sparkle size={12} />
          Botanical Essays & Fiber Wisdom
        </span>
        <h1 className="mt-3 font-display text-3xl font-normal tracking-tight text-ink md:text-5xl">
          The MOSSEN Journal
        </h1>
        <p className="mt-3 max-w-2xl font-text text-base text-ink-soft">
          Notes on dew retting, living indigo vats, un-scoured lanolin fleeces, and the quiet beauty
          of slow tailoring.
        </p>
      </div>

      {/* Featured Hero Article */}
      {featured && (
        <article className="mb-16 overflow-hidden rounded-md border border-stone-200/80 bg-[#fbf9f5] transition">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 md:aspect-auto">
              <Image
                priority
                src={featured.cover.src}
                alt={featured.cover.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-between p-8 md:p-12">
              <div>
                <div className="flex items-center gap-4 text-xs text-ink-faint tabular-nums">
                  <time dateTime={featured.publishedAt}>
                    {new Date(featured.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-brand">
                    <ClockIcon size={12} />
                    {featured.readingMinutes} min read
                  </span>
                </div>

                <h2 className="mt-4 font-display text-2xl leading-snug font-normal text-ink md:text-3xl">
                  <Link
                    href={routes.journalPost(featured.slug)}
                    className="transition hover:text-brand"
                  >
                    {featured.title}
                  </Link>
                </h2>

                <p className="mt-4 font-text text-sm leading-relaxed text-ink-soft md:text-base">
                  {featured.excerpt}
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href={routes.journalPost(featured.slug)}
                  className="inline-flex items-center gap-2 font-display text-sm font-medium text-brand hover:underline"
                >
                  Read Full Essay <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* Secondary Articles Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col justify-between overflow-hidden rounded-md border border-stone-200/70 bg-[#fcfbf7] p-5 transition hover:-translate-y-1"
          >
            <div>
              <Link
                href={routes.journalPost(post.slug)}
                className="relative mb-4 block aspect-[16/10] overflow-hidden rounded-md bg-stone-100"
              >
                <Image
                  src={post.cover.src}
                  alt={post.cover.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </Link>

              <div className="flex items-center gap-2 text-xs text-ink-faint tabular-nums">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <ClockIcon size={12} />
                  {post.readingMinutes}m
                </span>
              </div>

              <h3 className="mt-2 font-display text-base leading-snug font-normal text-ink">
                <Link href={routes.journalPost(post.slug)} className="transition hover:text-brand">
                  {post.title}
                </Link>
              </h3>

              <p className="mt-2 line-clamp-3 font-text text-xs leading-relaxed text-ink-soft">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 border-t border-stone-200/60 pt-4">
              <Link
                href={routes.journalPost(post.slug)}
                className="inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline"
              >
                Read Essay <ArrowRight size={12} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
