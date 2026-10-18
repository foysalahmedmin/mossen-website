import { Suspense } from 'react'
import { ProductListView } from '@/components/commerce/product-list-view'
import { parseProductQuery } from '@/features/catalog/query-params'
import { pageMetadata } from '@/lib/metadata'
import { services } from '@/services'

export const generateMetadata = () => pageMetadata('shop')

interface ShopPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default function ShopPage(props: ShopPageProps) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] animate-pulse" aria-busy="true" />}>
      <ShopContent {...props} />
    </Suspense>
  )
}

async function ShopContent({ searchParams }: ShopPageProps) {
  const rawParams = await searchParams
  const query = parseProductQuery(rawParams)

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
        title="Atelier Offerings"
        description="Garments shaped by hand from unbleached Baltic flax linen, raw Gotland island wool, and natural plant dye vats."
        basePath="/shop"
      />
    </Suspense>
  )
}
