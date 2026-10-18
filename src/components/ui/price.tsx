import { VisuallyHidden } from 'radix-ui'
import { formatMoney, type MoneyFormat } from '@/domain/money'
import { cn } from '@/lib/cn'

export interface PriceProps extends MoneyFormat {
  amount: number
  compareAt?: number
  labels: { sale: string; original: string }
  className?: string
}

export function Price({ amount, compareAt, currency, locale, labels, className }: PriceProps) {
  const onSale = compareAt !== undefined && compareAt > amount
  return (
    <span
      data-on-sale={onSale || undefined}
      className={cn('inline-flex items-center text-sm text-ink tabular-nums', className)}
    >
      {onSale ? <VisuallyHidden.Root>{labels.sale} </VisuallyHidden.Root> : null}
      <span className={cn(onSale && 'font-medium text-danger')}>
        {formatMoney(amount, { currency, locale })}
      </span>
      {onSale ? ' ' : null}
      {onSale ? (
        <del className="ml-2 font-normal text-ink-faint line-through">
          <VisuallyHidden.Root>{labels.original} </VisuallyHidden.Root>
          {formatMoney(compareAt, { currency, locale })}
        </del>
      ) : null}
    </span>
  )
}
