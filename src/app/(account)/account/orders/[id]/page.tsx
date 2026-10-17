import { AccountOrderDetailView } from '@/components/commerce/account-views'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('order')

export default async function AccountOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <AccountOrderDetailView id={id} />
}
