import { Suspense } from 'react'
import { ProductListView } from '@/components/commerce/product-list-view'
import { parseProductQuery } from '@/features/catalog/query-params'
import { pageMetadata } from '@/lib/metadata'
import { services } from '@/services'

export const generateMetadata = () => pageMetadata('new-arrivals')

interface NewArrivalsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default function NewArrivalsPage(props: NewArrivalsPageProps) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] animate-pulse" aria-busy="true" />}>
      <NewArrivalsContent {...props} />
    </Suspense>
  )
}

async function NewArrivalsContent({ searchParams }: NewArrivalsPageProps) {
  const rawParams = await searchParams
  const query = parseProductQuery({
    sort: 'newest',
    ...rawParams,
  })

  const result = await services.catalog.listProducts(query)

  return (
    <Suspense
      fallback={
        <div className="border-border min-h-[400px] animate-pulse rounded-md border bg-surface" />
      }
    >
      <ProductListView
        products={result.page.items}
        total={result.page.total}
        facets={result.facets}
        query={query}
        title="New arrivals"
        description="Freshly woven garments from the Copenhagen and Kyoto studios: natural madder tunics, raw hemp overshirts, and unbleached linen smocks."
        basePath="/new-arrivals"
      />
    </Suspense>
  )
}
