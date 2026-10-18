'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Sparkle } from '@/components/icons'
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

export function JournalPostView({
  post,
  relatedPosts = [],
}: {
  post: JournalPost
  relatedPosts?: JournalPost[]
}) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      {/* Navigation */}
      <div className="mb-8">
        <Link
          href={routes.journal}
          className="inline-flex items-center gap-2 font-text text-sm font-medium text-ink-soft transition hover:text-ink"
        >
          <ArrowLeft size={16} />
          Back to Journal
        </Link>
      </div>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 font-mono text-xs tracking-wider text-ink-faint uppercase">
          <span className="inline-flex items-center gap-1 font-semibold text-brand">
            <Sparkle size={12} />
            Botanical Essay
          </span>
          <span>·</span>
          <time dateTime={post.publishedAt}>{publishedDate}</time>
          <span>·</span>
          <span className="flex items-center gap-1 text-ink-soft">
            <ClockIcon size={12} />
            {post.readingMinutes} min read
          </span>
        </div>

        <h1 className="mt-4 font-display text-3xl leading-tight font-normal tracking-tight text-ink md:text-5xl">
          {post.title}
        </h1>

        <p className="mt-5 font-text text-lg leading-relaxed text-ink-soft md:text-xl">
          {post.excerpt}
        </p>
      </header>

      {/* Hero Media */}
      <div className="relative mb-12 overflow-hidden rounded-[32px] border border-stone-200/80 bg-[#fbf9f5] shadow-sm">
        <Image
          priority
          src={post.cover.src}
          alt={post.cover.alt}
          width={post.cover.width}
          height={post.cover.height}
          sizes="(min-width: 1024px) 768px, 100vw"
          className="aspect-[16/9] w-full object-cover"
        />
        <div className="border-t border-stone-200/60 p-3 text-center font-text text-xs text-ink-faint">
          {post.cover.alt}
        </div>
      </div>

      {/* Article Body */}
      <div className="space-y-6 font-text text-base leading-relaxed text-ink-soft md:text-lg">
        {post.body.map((paragraph, idx) => (
          <p
            key={idx}
            className="first-letter:font-display first-letter:text-2xl first-letter:font-normal first-letter:text-ink"
          >
            {paragraph}
          </p>
        ))}

        {/* Botanical Pull Quote */}
        <blockquote className="my-10 rounded-[24px] border-l-4 border-brand bg-[#fcfbf7] p-6 shadow-sm md:p-8">
          <p className="font-display text-lg font-normal text-ink italic md:text-xl">
            &ldquo;When linen is retted under morning dew rather than industrial chemicals, it
            retains the breath of the meadow and remembers the earth from which it grew.&rdquo;
          </p>
          <cite className="mt-3 block font-mono text-xs tracking-wider text-ink-faint uppercase not-italic">
            — MOSSEN Atelier Journal
          </cite>
        </blockquote>
      </div>

      {/* Related Essays */}
      {relatedPosts.length > 0 && (
        <section className="mt-20 border-t border-stone-200/80 pt-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl font-normal text-ink">
              Related Botanical Stories
            </h2>
            <Link
              href={routes.journal}
              className="font-text text-sm font-semibold text-brand hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={routes.journalPost(related.slug)}
                className="group flex flex-col justify-between overflow-hidden rounded-[28px] border border-stone-200/70 bg-[#fcfbf7] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-[20px] bg-stone-100">
                    <Image
                      src={related.cover.src}
                      alt={related.cover.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-ink-faint">
                    <ClockIcon size={12} />
                    <span>{related.readingMinutes} min</span>
                  </div>
                  <h3 className="mt-2 font-display text-base font-normal text-ink transition group-hover:text-brand">
                    {related.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
