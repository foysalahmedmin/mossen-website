import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Leaf } from '@/components/icons'
import { ConnectedProductCard } from '@/components/commerce/connected-product-card'
import { NewsletterSection } from '@/components/commerce/newsletter-section'
import { Button } from '@/components/ui'
import type { JournalPost, Product } from '@/domain'
import { pageMetadata } from '@/lib/metadata'
import { services } from '@/services'

export const generateMetadata = () => pageMetadata('home')

export default async function HomePage() {
  const home = await services.content.getHome()

  // Fetch featured products
  const featuredProducts = (
    await Promise.all(
      home.featuredRail.productSlugs.map((slug) => services.catalog.getProduct(slug)),
    )
  ).filter((p): p is Product => p !== null)

  // Fetch journal teasers
  const teaserPosts = (
    await Promise.all(
      home.journalTeasers.postSlugs.map((slug) => services.content.getJournalPost(slug)),
    )
  ).filter((post): post is JournalPost => post !== null)

  return (
    <div className="page-container space-y-16 pb-16 md:space-y-28">
      {/* 1. Hero Section */}
      <section aria-label="Brand statement" className="relative overflow-hidden pt-4 md:pt-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-7">
            <div className="border-border inline-flex items-center gap-2 rounded-full border bg-surface px-4 py-1.5 font-serif text-xs text-brand">
              <Leaf size={14} className="text-brand" />
              <span>{home.hero.eyecatch}</span>
            </div>

            <h1 className="font-display text-4xl leading-[1.08] font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {home.hero.headline}
            </h1>

            <p className="max-w-xl font-text text-base leading-relaxed text-ink-soft md:text-lg">
              {home.hero.body}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href={home.hero.cta.href}>
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-full px-8 font-serif text-sm shadow-sm"
                >
                  <span>{home.hero.cta.label}</span>
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/collections">
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-full px-7 font-serif text-sm"
                >
                  Atelier Collections
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="border-border rounded-[36px] border bg-surface p-3 shadow-lg">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[26px]">
                <Image
                  src={home.hero.media.src}
                  alt={home.hero.media.alt}
                  width={home.hero.media.width}
                  height={home.hero.media.height}
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Rail */}
      <section aria-labelledby="featured-heading" className="space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              id="featured-heading"
              className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl"
            >
              {home.featuredRail.title}
            </h2>
            <p className="mt-1 font-text text-sm text-ink-soft md:text-base">
              {home.featuredRail.subtitle}
            </p>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-1.5 font-serif text-xs font-semibold text-ink transition hover:text-brand"
          >
            <span>All Atelier Pieces</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {featuredProducts.map((product, idx) => (
            <ConnectedProductCard key={product.id} product={product} priority={idx < 2} />
          ))}
        </div>
      </section>

      {/* 3. Category Entry Points */}
      <section aria-labelledby="categories-heading" className="space-y-8">
        <div>
          <h2
            id="categories-heading"
            className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl"
          >
            Craft Disciplines
          </h2>
          <p className="mt-1 font-text text-sm text-ink-soft md:text-base">
            Raw unbleached linen garments, gotland wool knitwear, and hand-cast pebble jewelry
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {home.categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="group border-border relative flex flex-col overflow-hidden rounded-[32px] border bg-surface p-3 shadow-sm transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-canvas">
                <Image
                  src={cat.media.src}
                  alt={cat.media.alt}
                  width={cat.media.width}
                  height={cat.media.height}
                  sizes="(min-width: 768px) 33vw, 90vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent" />
                <div className="absolute right-4 bottom-4 left-4 text-ink">
                  <h3 className="font-display text-xl font-bold tracking-tight">{cat.title}</h3>
                  <p className="mt-0.5 font-serif text-xs text-ink-soft">{cat.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Editorial Spotlight */}
      <section
        aria-labelledby="editorial-heading"
        className="border-border relative overflow-hidden rounded-[36px] border bg-surface p-6 shadow-sm md:p-12"
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[26px] lg:col-span-5 lg:aspect-square">
            <Image
              src={home.editorial.media.src}
              alt={home.editorial.media.alt}
              width={home.editorial.media.width}
              height={home.editorial.media.height}
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6 lg:col-span-7">
            <span className="font-serif text-xs text-brand">Field Chronicle</span>
            <h2
              id="editorial-heading"
              className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl"
            >
              {home.editorial.title}
            </h2>
            {home.editorial.quote ? (
              <blockquote className="border-l-2 border-brand pl-4 font-serif text-base text-ink/90 italic">
                &ldquo;{home.editorial.quote}&rdquo;
              </blockquote>
            ) : null}
            <p className="font-text text-sm leading-relaxed text-ink-soft md:text-base">
              {home.editorial.body}
            </p>
            {home.editorial.cta ? (
              <div>
                <Link href={home.editorial.cta.href}>
                  <Button
                    variant="secondary"
                    size="md"
                    className="rounded-full px-6 font-serif text-xs"
                  >
                    <span>{home.editorial.cta.label}</span>
                    <ArrowRight size={14} className="ml-1.5" />
                  </Button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* 5. Mirror Try Explainer */}
      <section
        aria-labelledby="explainer-heading"
        className="border-border relative space-y-10 overflow-hidden rounded-[36px] border bg-surface p-8 shadow-sm md:p-14"
      >
        <div className="max-w-2xl space-y-2">
          <span className="font-serif text-xs text-brand">Virtual Natural Fitting</span>
          <h2
            id="explainer-heading"
            className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl"
          >
            {home.mirrorTryExplainer.title}
          </h2>
          <p className="font-text text-sm text-ink-soft md:text-base">
            {home.mirrorTryExplainer.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {home.mirrorTryExplainer.steps.map((step) => (
            <div
              key={step.step}
              className="border-border relative space-y-3 overflow-hidden rounded-[26px] border bg-canvas p-6"
            >
              <div className="border-border flex h-10 w-10 items-center justify-center rounded-full border bg-surface font-serif text-sm font-semibold text-brand">
                0{step.step}
              </div>
              <h3 className="font-display text-base font-bold text-ink">{step.title}</h3>
              <p className="font-text text-xs leading-relaxed text-ink-soft md:text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <Link href="/shop">
            <Button
              variant="primary"
              size="md"
              className="rounded-full px-7 font-serif text-sm shadow-sm"
            >
              <span>{home.mirrorTryExplainer.cta.label}</span>
              <ArrowRight size={14} className="ml-1.5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 6. Journal Teasers */}
      <section aria-labelledby="journal-heading" className="space-y-8">
        <div className="flex items-center justify-between">
          <h2
            id="journal-heading"
            className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl"
          >
            {home.journalTeasers.title}
          </h2>
          <Link
            href="/journal"
            className="group inline-flex items-center gap-1.5 font-serif text-xs font-semibold text-ink transition hover:text-brand"
          >
            <span>All Field Notes</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {teaserPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="group border-border relative flex flex-col overflow-hidden rounded-[32px] border bg-surface p-4 shadow-sm transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px] bg-canvas">
                <Image
                  src={post.cover.src}
                  alt={post.cover.alt}
                  width={post.cover.width}
                  height={post.cover.height}
                  sizes="(min-width: 768px) 50vw, 90vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 space-y-2 px-1">
                <span className="font-serif text-xs text-ink-soft">
                  {post.readingMinutes} min read
                </span>
                <h3 className="font-display text-lg font-bold text-ink transition group-hover:text-brand">
                  {post.title}
                </h3>
                <p className="line-clamp-2 font-text text-xs leading-relaxed text-ink-soft md:text-sm">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Newsletter */}
      <NewsletterSection
        title={home.newsletter.title}
        description={home.newsletter.description}
        placeholder={home.newsletter.placeholder}
        cta={home.newsletter.cta}
      />
    </div>
  )
}
