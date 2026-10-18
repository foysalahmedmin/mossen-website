import Image from 'next/image'
import Link from 'next/link'
import { ConnectedProductCard } from '@/components/commerce/connected-product-card'
import { NewsletterSection } from '@/components/commerce/newsletter-section'
import { Carousel } from '@/components/home/carousel'
import { ArrowRight, Leaf, Star } from '@/components/icons'
import { Button } from '@/components/ui'
import { OpenMirrorTry } from '@/integration/mirror-try'
import type { JournalPost, Product, Review } from '@/domain'
import { Reveal } from '@/lib/motion'
import { pageMetadata } from '@/lib/metadata'
import { services } from '@/services'

export const generateMetadata = () => pageMetadata('home')

function SectionHeading({
  id,
  title,
  subtitle,
  center = false,
}: {
  id: string
  title: string
  subtitle?: string
  center?: boolean
}) {
  return (
    <div className={center ? 'mx-auto max-w-xl pb-10 text-center md:pb-14' : 'max-w-xl'}>
      <h2
        id={id}
        className="font-display text-3xl leading-tight font-normal tracking-tight text-ink md:text-5xl"
      >
        {title}
      </h2>
      {subtitle ? <p className="mt-3 text-sm text-ink-soft md:text-base">{subtitle}</p> : null}
    </div>
  )
}

export default async function HomePage() {
  const [home, lookbook, edit] = await Promise.all([
    services.content.getHome(),
    services.content.getLookbook(),
    services.catalog.listProducts({ category: 'clothing', sort: 'featured', pageSize: 8 }),
  ])

  const editProducts = edit.page.items
  const [leftPiece, rightPiece] = [editProducts[1], editProducts[2]]

  const teaserPosts = (
    await Promise.all(
      home.journalTeasers.postSlugs.map((slug) => services.content.getJournalPost(slug)),
    )
  ).filter((post): post is JournalPost => post !== null)

  const reviewPicks = (
    await Promise.all(
      editProducts.slice(0, 3).map(async (product) => {
        const review = (await services.catalog.listReviews(product.id)).find((r) => r.rating === 5)
        return review ? { review, product } : null
      }),
    )
  ).filter((pick): pick is { review: Review; product: Product } => pick !== null)
  const [lead, ...others] = reviewPicks

  const [firstPost, secondPost] = teaserPosts
  const looks = lookbook.looks.slice(0, 3)
  const lookCols = [
    'col-span-12 sm:col-span-5',
    'col-span-6 sm:col-span-4 sm:mt-20',
    'col-span-6 sm:col-span-3 sm:mt-8',
  ]
  const lookAspect = ['aspect-4/5', 'aspect-3/4', 'aspect-square']

  return (
    <div>
      {/* Hero: centred words, then three pictures at different heights */}
      <section aria-label="Brand statement" className="page-container pt-12 pb-16 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mossen-rise flex items-center justify-center gap-2 text-sm text-ink-soft">
            <Leaf size={16} aria-hidden="true" className="text-brand" />
            {home.hero.eyecatch}
          </p>
          <h1
            className="mossen-rise mt-5 font-display text-5xl leading-[1.04] font-normal tracking-tight text-balance text-ink sm:text-6xl xl:text-7xl"
            style={{ ['--delay' as string]: '120ms' }}
          >
            {home.hero.headline}
          </h1>
          <p
            className="mossen-rise mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
            style={{ ['--delay' as string]: '260ms' }}
          >
            {home.hero.body}
          </p>
          <div
            className="mossen-rise mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
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

        <div className="mossen-bloom mt-14 grid grid-cols-12 items-start gap-4 md:mt-20 md:gap-8">
          {leftPiece ? (
            <Link
              href={`/products/${leftPiece.slug}`}
              className="group col-span-3 mt-16 hidden md:block"
            >
              <span className="relative block aspect-3/4 overflow-hidden rounded-md bg-surface">
                <Image
                  src={leftPiece.media[0]!.src}
                  alt={leftPiece.media[0]!.alt}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                />
              </span>
              <span className="mt-3 block text-sm text-ink">{leftPiece.name}</span>
            </Link>
          ) : null}
          <div className="relative col-span-12 aspect-4/5 overflow-hidden rounded-md bg-surface md:col-span-6 md:aspect-5/6">
            <Image
              src={home.hero.media.src}
              alt={home.hero.media.alt}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          {rightPiece ? (
            <Link
              href={`/products/${rightPiece.slug}`}
              className="group col-span-3 mt-32 hidden md:block"
            >
              <span className="relative block aspect-3/4 overflow-hidden rounded-md bg-surface">
                <Image
                  src={rightPiece.media[0]!.src}
                  alt={rightPiece.media[0]!.alt}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                />
              </span>
              <span className="mt-3 block text-sm text-ink">{rightPiece.name}</span>
            </Link>
          ) : null}
        </div>
      </section>

      {/* Featured: a row you move with the arrows or a swipe */}
      <section aria-labelledby="featured-heading" className="page-container pb-16 md:pb-24">
        <Carousel
          label="pieces"
          heading={
            <SectionHeading
              id="featured-heading"
              title={home.featuredRail.title}
              subtitle={home.featuredRail.subtitle}
            />
          }
          action={
            <Link href="/shop" className="link-draw hidden pb-1 text-sm text-ink sm:inline-flex">
              Shop all
            </Link>
          }
        >
          {editProducts.map((product, idx) => (
            <li key={product.id} className="flex w-[64vw] shrink-0 snap-start sm:w-68 lg:w-74">
              <ConnectedProductCard product={product} priority={idx < 3} className="w-full" />
            </li>
          ))}
        </Carousel>
      </section>

      {/* Categories: three portraits, the middle one set lower */}
      <section aria-labelledby="categories-heading" className="page-container pb-16 md:pb-28">
        <Reveal>
          <SectionHeading id="categories-heading" title="Shop by category" center />
        </Reveal>
        <ul className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {home.categories.map((cat, idx) => (
            <Reveal
              as="li"
              key={cat.slug}
              delay={idx * 90}
              className={idx === 1 ? 'md:mt-16' : undefined}
            >
              <Link href={`/shop/${cat.slug}`} className="group block">
                <span className="relative block aspect-4/5 overflow-hidden rounded-md bg-surface">
                  <Image
                    src={cat.media.src}
                    alt={cat.media.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                  />
                </span>
                <span className="mt-5 block text-center">
                  <span className="block font-display text-2xl text-ink">{cat.title}</span>
                  <span className="mt-1 block text-sm text-ink-soft">{cat.subtitle}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Editorial: a moss band the picture climbs out of */}
      <section
        aria-labelledby="editorial-heading"
        className="relative my-12 bg-moss-deep text-on-brand md:my-40"
      >
        <div className="page-container grid items-center gap-10 py-14 md:grid-cols-12 md:gap-16 md:py-14">
          <div className="relative aspect-3/4 overflow-hidden rounded-md md:col-span-5 md:-my-48">
            <Image
              src={home.editorial.media.src}
              alt={home.editorial.media.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <Reveal className="flex flex-col gap-6 md:col-span-7 md:pl-6">
            <h2
              id="editorial-heading"
              className="font-display text-3xl leading-tight font-normal tracking-tight md:text-5xl"
            >
              {home.editorial.title}
            </h2>
            {home.editorial.quote ? (
              <blockquote className="max-w-lg font-display text-xl leading-snug text-on-brand/90 italic md:text-3xl">
                &ldquo;{home.editorial.quote}&rdquo;
              </blockquote>
            ) : null}
            <p className="max-w-lg text-sm leading-relaxed text-on-brand/70 md:text-base">
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
        </div>
      </section>

      {/* Lookbook: three pictures of different sizes, like prints on a wall */}
      <section aria-labelledby="lookbook-heading" className="page-container pb-16 md:pb-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 pb-10 md:pb-14">
            <SectionHeading
              id="lookbook-heading"
              title={lookbook.title}
              subtitle={lookbook.season}
            />
            <Link href="/lookbook" className="link-draw pb-1 text-sm text-ink">
              Open lookbook
            </Link>
          </div>
        </Reveal>
        <ul className="grid grid-cols-12 items-start gap-4 md:gap-8">
          {looks.map((look, idx) => (
            <Reveal
              as="li"
              key={look.id}
              delay={idx * 100}
              className={lookCols[idx] ?? 'col-span-12'}
            >
              <Link href="/lookbook" className="group block">
                <span
                  className={`relative block overflow-hidden rounded-md bg-surface ${lookAspect[idx] ?? 'aspect-square'}`}
                >
                  <Image
                    src={look.media.src}
                    alt={look.media.alt}
                    fill
                    sizes="(min-width: 640px) 40vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                  />
                </span>
                <span className="mt-3 block font-display text-lg text-ink">
                  {look.title.replace(/^Look \d+\s*[—-]\s*/, '')}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Mirror Try: three round numbers on one thin line */}
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
          <ol className="relative mx-auto grid max-w-4xl gap-12 sm:grid-cols-3">
            <span
              aria-hidden="true"
              className="absolute top-7 right-[16%] left-[16%] hidden border-t border-dashed border-ink/30 sm:block"
            />
            {home.mirrorTryExplainer.steps.map((step, idx) => (
              <Reveal as="li" key={step.step} delay={idx * 100} className="relative">
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-ink/30 bg-surface font-display text-2xl text-ink tabular-nums">
                  {step.step}
                </span>
                <h3 className="mt-5 font-display text-xl text-ink">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-ink-soft">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </ol>
          <Button asChild className="mt-12">
            <OpenMirrorTry>
              {home.mirrorTryExplainer.cta.label}
              <ArrowRight size={14} aria-hidden="true" />
            </OpenMirrorTry>
          </Button>
        </div>
      </section>

      {/* Reviews: one quote given room, two more beneath it */}
      {lead ? (
        <section
          aria-labelledby="reviews-heading"
          className="page-container py-16 text-center md:py-28"
        >
          <h2 id="reviews-heading" className="sr-only">
            What customers say
          </h2>
          <Reveal className="mx-auto max-w-3xl">
            <div
              role="img"
              aria-label={`${lead.review.rating} out of 5 stars`}
              className="flex justify-center gap-1"
            >
              {Array.from({ length: lead.review.rating }, (_, i) => (
                <Star key={i} size={16} weight="fill" aria-hidden="true" className="text-brand" />
              ))}
            </div>
            <blockquote className="mt-6 font-display text-3xl leading-snug font-normal text-balance text-ink italic md:text-5xl">
              &ldquo;{lead.review.title}&rdquo;
            </blockquote>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
              {lead.review.body}
            </p>
            <p className="mt-6 text-sm text-ink-soft">
              {lead.review.author}
              {lead.review.verified ? ' · Verified purchase · ' : ' · '}
              <Link href={`/products/${lead.product.slug}`} className="link-draw text-ink">
                {lead.product.name}
              </Link>
            </p>
          </Reveal>
          {others.length > 0 ? (
            <ul className="mx-auto mt-16 grid max-w-4xl gap-10 border-t border-ink/15 pt-10 text-left sm:grid-cols-2">
              {others.map(({ review, product }, idx) => (
                <Reveal as="li" key={review.id} delay={idx * 120}>
                  <p className="font-display text-xl text-ink">&ldquo;{review.title}&rdquo;</p>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                    {review.body}
                  </p>
                  <p className="mt-3 text-xs text-ink-soft">
                    {review.author} ·{' '}
                    <Link href={`/products/${product.slug}`} className="link-draw text-ink">
                      {product.name}
                    </Link>
                  </p>
                </Reveal>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      {/* Journal: one large story, a second smaller and set lower */}
      <section aria-labelledby="journal-heading" className="page-container pb-16 md:pb-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 pb-10 md:pb-14">
            <SectionHeading id="journal-heading" title={home.journalTeasers.title} />
            <Link href="/journal" className="link-draw pb-1 text-sm text-ink">
              All stories
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {firstPost ? (
            <Reveal className="md:col-span-7">
              <Link href={`/journal/${firstPost.slug}`} className="group block">
                <span className="relative block aspect-4/3 overflow-hidden rounded-md bg-surface">
                  <Image
                    src={firstPost.cover.src}
                    alt={firstPost.cover.alt}
                    fill
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  />
                </span>
                <span className="mt-5 block text-xs text-ink-soft">
                  {firstPost.readingMinutes} min read
                </span>
                <span className="mt-1 block font-display text-3xl leading-snug text-ink">
                  {firstPost.title}
                </span>
                <span className="mt-3 line-clamp-2 block max-w-xl text-sm text-ink-soft">
                  {firstPost.excerpt}
                </span>
              </Link>
            </Reveal>
          ) : null}
          {secondPost ? (
            <Reveal delay={150} className="md:col-span-5 md:mt-28">
              <Link href={`/journal/${secondPost.slug}`} className="group block">
                <span className="relative block aspect-4/5 overflow-hidden rounded-md bg-surface">
                  <Image
                    src={secondPost.cover.src}
                    alt={secondPost.cover.alt}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  />
                </span>
                <span className="mt-5 block text-xs text-ink-soft">
                  {secondPost.readingMinutes} min read
                </span>
                <span className="mt-1 block font-display text-2xl leading-snug text-ink">
                  {secondPost.title}
                </span>
              </Link>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* The basics: one line, read like a sentence */}
      <section aria-label="Delivery, returns and mending" className="page-container pb-16 md:pb-24">
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-y border-ink/15 py-6 font-display text-lg text-ink italic md:text-xl">
          {[
            'Free delivery over $150',
            'Thirty days to return',
            'Plastic-free packaging',
            'Mended for life',
          ].map((item, idx) => (
            <li key={item} className="flex items-center gap-5">
              {idx > 0 ? (
                <Leaf size={14} aria-hidden="true" className="hidden text-brand sm:block" />
              ) : null}
              {item}
            </li>
          ))}
        </ul>
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
