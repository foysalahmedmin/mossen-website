import { Suspense } from 'react'
import { AccountOrderDetailView } from '@/components/commerce/account-views'

interface PageProps {
  params: Promise<{ id: string }>
}

async function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <AccountOrderDetailView id={id} />
}

export default function AccountOrderDetailPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="paper mx-auto max-w-md rounded-2xl p-8 text-center text-ink-muted">Loading Piece...</div>}>
      <OrderDetail params={props.params} />
    </Suspense>
  )
}

