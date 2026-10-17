import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Leaf } from '@/components/icons'
import { pageMetadata } from '@/lib/metadata'
import { services } from '@/services'

export const generateMetadata = () => pageMetadata('collections')

export default async function CollectionsPage() {
  const collections = await services.catalog.listCollections()
  const collectionsWithCovers = await Promise.all(
    collections.map(async (coll) => {
      const list = await services.catalog.listProducts({ collection: coll.slug, pageSize: 1 })
      const cover = list.page.items[0]?.media[0]
      return { ...coll, cover }
    }),
  )

  return (
    <div className="space-y-10 pb-16">
      <div className="space-y-2 border-b border-border pb-6">
        <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-ink">
          Seasonal Collections
        </h1>
        <p className="max-w-2xl font-text text-sm md:text-base text-ink-soft leading-relaxed">
          Small-batch artisanal capsules inspired by Baltic coastal mist, wild forest lichen, and hand-loomed silence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collectionsWithCovers.map((coll) => (
          <Link
            key={coll.slug}
            href={`/collections/${coll.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-[32px] border border-border bg-surface p-3.5 transition-all duration-300 hover:-translate-y-1.5 shadow-sm"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[24px] bg-canvas">
              {coll.cover ? (
                <Image
                  src={coll.cover.src}
                  alt={coll.cover.alt}
                  width={coll.cover.width}
                  height={coll.cover.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 90vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-canvas">
                  <Leaf size={32} className="text-brand/40" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent" />
              <div className="absolute top-4 right-4">
                <span className="rounded-full border border-border bg-surface px-3 py-1 font-serif text-xs text-ink shadow-sm">
                  Capsule
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-1 flex-col justify-between px-1.5 pb-1 space-y-3">
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink group-hover:text-brand transition">
                  {coll.name}
                </h2>
                <p className="mt-1 line-clamp-2 font-text text-xs md:text-sm text-ink-soft leading-relaxed">
                  {coll.description}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 font-serif text-xs font-semibold text-brand">
                <span>Contemplate Capsule</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
