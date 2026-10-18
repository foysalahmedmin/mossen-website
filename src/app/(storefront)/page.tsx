import Image from 'next/image'
import Link from 'next/link'
import { ConnectedProductCard } from '@/components/commerce/connected-product-card'
import { NewsletterSection } from '@/components/commerce/newsletter-section'
import { ArrowRight, Star } from '@/components/icons'
import { Button } from '@/components/ui'
import type { JournalPost, Product, Review } from '@/domain'
import { Reveal } from '@/lib/motion'
import { pageMetadata } from '@/lib/metadata'
import { services } from '@/services'

export const generateMetadata = () => pageMetadata('home')

function SectionHeading({
  id,
  title,
  subtitle,
  href,
  hrefLabel,
  center = false,
}: {
  id: string
  title: string
  subtitle?: string
  href?: string
  hrefLabel?: string
  center?: boolean
}) {
  return (
    <div
      className={`flex flex-col gap-4 pb-10 md:pb-12 ${center ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}
    >
      <div>
        <h2
          id={id}
          className="font-display text-3xl leading-tight font-normal tracking-tight text-ink md:text-5xl"
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={`mt-3 max-w-lg text-sm text-ink-soft md:text-base ${center ? 'mx-auto' : ''}`}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      {href && hrefLabel ? (
        <Link
          href={href}
          className="link-draw group inline-flex shrink-0 items-center gap-2 pb-1 text-sm text-ink"
        >
          {hrefLabel}
          <ArrowRight
            size={14}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      ) : null}
    </div>
  )
}

export default async function HomePage() {
  const [home, lookbook] = await Promise.all([
    services.content.getHome(),
    services.content.getLookbook(),
  ])

  const featuredProducts = (
    await Promise.all(
      home.featuredRail.productSlugs.map((slug) => services.catalog.getProduct(slug)),
    )
  ).filter((p): p is Product => p !== null)

  const teaserPosts = (
    await Promise.all(
      home.journalTeasers.postSlugs.map((slug) => services.content.getJournalPost(slug)),
    )
  ).filter((post): post is JournalPost => post !== null)

  const reviewPicks = (
    await Promise.all(
      featuredProducts.slice(0, 3).map(async (product) => {
        const review = (await services.catalog.listReviews(product.id)).find((r) => r.rating === 5)
        return review ? { review, product } : null
      }),
    )
  ).filter((pick): pick is { review: Review; product: Product } => pick !== null)

  return (
    <div>
      {/* Hero: a quiet headline, one tall photograph */}
      <section aria-label="Brand statement" className="page-container py-10 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="mossen-rise text-sm text-ink-soft">{home.hero.eyecatch}</p>
            <h1
              className="mossen-rise mt-5 font-display text-5xl leading-[1.02] font-normal tracking-tight text-balance text-ink sm:text-6xl xl:text-7xl"
              style={{ ['--delay' as string]: '120ms' }}
            >
              {home.hero.headline}
            </h1>
            <p
              className="mossen-rise mt-6 max-w-md text-base leading-relaxed text-ink-soft md:text-lg"
              style={{ ['--delay' as string]: '260ms' }}
            >
              {home.hero.body}
            </p>
            <div
              className="mossen-rise mt-9 flex flex-wrap items-center gap-x-7 gap-y-3"
              style={{ ['--delay' as string]: '380ms' }}
            >
              <Button asChild size="lg">
                <Link href={home.hero.cta.href}>
                  {home.hero.cta.label}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </Button>
              <Link href="/collections" className="link-draw pb-1 text-sm text-ink">
                Collections
              </Link>
            </div>
          </div>
          <div className="mossen-bloom relative aspect-[4/5] overflow-hidden rounded-md bg-surface lg:col-span-6">
            <Image
              src={home.hero.media.src}
              alt={home.hero.media.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured pieces */}
      <section aria-labelledby="featured-heading" className="page-container py-16 md:py-24">
        <Reveal>
          <SectionHeading
            id="featured-heading"
            title={home.featuredRail.title}
            subtitle={home.featuredRail.subtitle}
            href="/shop"
            hrefLabel="Shop all"
          />
        </Reveal>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-6">
          {featuredProducts.map((product, idx) => (
            <Reveal as="li" key={product.id} delay={idx * 80} className="flex">
              <ConnectedProductCard product={product} priority={idx < 2} className="w-full" />
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Categories: three portraits, captions beneath on the linen */}
      <section aria-labelledby="categories-heading" className="page-container pb-16 md:pb-24">
        <Reveal>
          <SectionHeading id="categories-heading" title="Shop by category" center />
        </Reveal>
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {home.categories.map((cat, idx) => (
            <Reveal as="li" key={cat.slug} delay={idx * 90}>
              <Link href={`/shop/${cat.slug}`} className="group block">
                <span className="relative block aspect-[4/5] overflow-hidden rounded-md bg-surface">
                  <Image
                    src={cat.media.src}
                    alt={cat.media.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                  />
                </span>
                <span className="mt-4 flex items-baseline justify-between gap-4">
                  <span>
                    <span className="block font-display text-2xl text-ink">{cat.title}</span>
                    <span className="mt-1 block text-sm text-ink-soft">{cat.subtitle}</span>
                  </span>
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-ink transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Editorial: a deep moss band, copy left, picture right */}
      <section aria-labelledby="editorial-heading" className="bg-moss-deep text-on-brand">
        <div className="grid md:grid-cols-2">
          <Reveal className="flex flex-col justify-center gap-6 px-6 py-14 md:px-14 md:py-20 lg:px-24">
            <h2
              id="editorial-heading"
              className="font-display text-3xl leading-tight font-normal tracking-tight md:text-5xl"
            >
              {home.editorial.title}
            </h2>
            {home.editorial.quote ? (
              <blockquote className="max-w-md font-display text-xl leading-snug text-on-brand/90 italic md:text-2xl">
                &ldquo;{home.editorial.quote}&rdquo;
              </blockquote>
            ) : null}
            <p className="max-w-md text-sm leading-relaxed text-on-brand/70 md:text-base">
              {home.editorial.body}
            </p>
            {home.editorial.cta ? (
              <Link
                href={home.editorial.cta.href}
                className="group inline-flex w-fit items-center gap-2 border-b border-on-brand/50 pb-1 text-sm text-on-brand hover:border-on-brand"
              >
                {home.editorial.cta.label}
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            ) : null}
          </Reveal>
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[38rem]">
            <Image
              src={home.editorial.media.src}
              alt={home.editorial.media.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Lookbook: a row you can drag sideways */}
      <section aria-labelledby="lookbook-heading" className="py-16 md:py-24">
        <div className="page-container">
          <Reveal>
            <SectionHeading
              id="lookbook-heading"
              title={lookbook.title}
              subtitle={lookbook.season}
              href="/lookbook"
              hrefLabel="Open lookbook"
            />
          </Reveal>
        </div>
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-[max(2.5rem,calc((100vw-1180px)/2+2.5rem))]">
          {lookbook.looks.slice(0, 3).map((look) => (
            <li key={look.id} className="w-[72vw] shrink-0 snap-start sm:w-[24rem]">
              <Link href="/lookbook" className="group block">
                <span className="relative block aspect-[3/4] overflow-hidden rounded-md bg-surface">
                  <Image
                    src={look.media.src}
                    alt={look.media.alt}
                    fill
                    sizes="(min-width: 640px) 24rem, 72vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                  />
                </span>
                <span className="mt-3 block text-sm text-ink">
                  {look.title.replace(/^Look \d+\s*[—-]\s*/, '')}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Mirror Try: centred, three short steps */}
      <section aria-labelledby="explainer-heading" className="bg-surface">
        <div className="page-container py-16 text-center md:py-24">
          <Reveal>
            <SectionHeading
              id="explainer-heading"
              title={home.mirrorTryExplainer.title}
              subtitle={home.mirrorTryExplainer.subtitle}
              center
            />
          </Reveal>
          <ol className="mx-auto grid max-w-4xl gap-10 text-left sm:grid-cols-3">
            {home.mirrorTryExplainer.steps.map((step, idx) => (
              <Reveal as="li" key={step.step} delay={idx * 100}>
                <span className="font-display text-3xl text-ink-faint tabular-nums">
                  {String(step.step).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-base font-medium text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
              </Reveal>
            ))}
          </ol>
          <Button asChild className="mt-12">
            <Link href="/shop">
              {home.mirrorTryExplainer.cta.label}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Reviews: real quotes from the catalogue */}
      {reviewPicks.length > 0 ? (
        <section aria-labelledby="reviews-heading" className="page-container pt-16 md:pt-24">
          <Reveal>
            <SectionHeading id="reviews-heading" title="What customers say" />
          </Reveal>
          <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
            {reviewPicks.map(({ review, product }, idx) => (
              <Reveal
                as="li"
                key={review.id}
                delay={idx * 120}
                className="border-t border-ink/40 pt-6"
              >
                <div
                  role="img"
                  aria-label={`${review.rating} out of 5 stars`}
                  className="flex gap-0.5"
                >
                  {Array.from({ length: review.rating }, (_, i) => (
                    <Star key={i} size={14} weight="fill" aria-hidden="true" className="text-ink" />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-2xl leading-snug font-normal text-ink">
                  &ldquo;{review.title}&rdquo;
                </blockquote>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{review.body}</p>
                <p className="mt-5 text-xs text-ink-soft">
                  {review.author}
                  {review.verified ? ' · Verified purchase' : ''}
                </p>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-1 inline-block text-sm text-ink underline-offset-4 hover:underline"
                >
                  {product.name}
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Journal */}
      <section aria-labelledby="journal-heading" className="page-container py-16 md:py-24">
        <Reveal>
          <SectionHeading
            id="journal-heading"
            title={home.journalTeasers.title}
            href="/journal"
            hrefLabel="All stories"
          />
        </Reveal>
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
          {teaserPosts.map((post, idx) => (
            <Reveal as="li" key={post.slug} delay={idx * 100}>
              <Link href={`/journal/${post.slug}`} className="group block">
                <span className="relative block aspect-[16/10] overflow-hidden rounded-md bg-surface">
                  <Image
                    src={post.cover.src}
                    alt={post.cover.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  />
                </span>
                <span className="mt-4 block text-xs text-ink-soft">
                  {post.readingMinutes} min read
                </span>
                <span className="mt-1 block font-display text-2xl leading-snug text-ink">
                  {post.title}
                </span>
                <span className="mt-2 line-clamp-2 block text-sm text-ink-soft">
                  {post.excerpt}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* The basics, stated once */}
      <section aria-label="Shipping, returns and payment" className="border-t border-ink/15">
        <dl className="page-container grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4 md:py-12">
          {[
            ['Free shipping', 'On orders over $150'],
            ['30-day returns', 'Unworn, with tags attached'],
            ['Try before you buy', 'Preview the fit with Mirror Try'],
            ['Secure checkout', 'Encrypted card payment'],
          ].map(([title, text]) => (
            <div key={title}>
              <dt className="text-sm font-medium text-ink">{title}</dt>
              <dd className="mt-1 text-sm text-ink-soft">{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <NewsletterSection
        title={home.newsletter.title}
        description={home.newsletter.description}
        placeholder={home.newsletter.placeholder}
        cta={home.newsletter.cta}
      />
    </div>
  )
}
