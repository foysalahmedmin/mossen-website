import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CentredHeader } from './centred-header'

vi.mock('next/navigation', () => ({
  usePathname: () => '/shop',
}))

describe('CentredHeader', () => {
  it('renders lowercase brand mark and core navigation links', () => {
    render(<CentredHeader cartCount={2} wishlistCount={1} />)

    expect(screen.getByRole('link', { name: 'Mossen Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Shop' })).toHaveAttribute('href', '/shop')
    expect(screen.getByRole('link', { name: 'Collections' })).toHaveAttribute(
      'href',
      '/collections',
    )
    expect(screen.getByRole('link', { name: 'Journal' })).toHaveAttribute('href', '/journal')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: 'Search' })).toHaveAttribute('href', '/search')
    expect(screen.getByRole('link', { name: 'Wishlist' })).toHaveAttribute('href', '/wishlist')
    expect(screen.getByRole('link', { name: 'Basket' })).toHaveAttribute('href', '/cart')
  })

  it('displays badge counts for cart and wishlist', () => {
    render(<CentredHeader cartCount={3} wishlistCount={5} />)
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('triggers onOpenMenu and onOpenBasket callbacks when provided', async () => {
    const onOpenMenu = vi.fn()
    const onOpenBasket = vi.fn()
    render(<CentredHeader onOpenMenu={onOpenMenu} onOpenBasket={onOpenBasket} />)

    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(onOpenMenu).toHaveBeenCalledTimes(1)

    await userEvent.click(screen.getByRole('button', { name: 'Basket' }))
    expect(onOpenBasket).toHaveBeenCalledTimes(1)
  })
})
