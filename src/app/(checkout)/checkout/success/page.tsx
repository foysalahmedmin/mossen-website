import { Suspense } from 'react'
import { OrderConfirmationView } from '@/components/commerce/order-success-view'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('checkout-success')

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto min-h-[50vh] max-w-4xl py-20 text-center font-mono text-xs tracking-widest text-ink-soft uppercase">
          Loading order receipt...
        </div>
      }
    >
      <OrderConfirmationView />
    </Suspense>
  )
}
