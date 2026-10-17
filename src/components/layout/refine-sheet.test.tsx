import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { RefineSheet } from './refine-sheet'

describe('RefineSheet', () => {
  it('renders trigger button and opens dialog when clicked', async () => {
    render(
      <RefineSheet triggerLabel="Refine Pieces" activeCount={2}>
        <p>Filter body content</p>
      </RefineSheet>,
    )

    const trigger = screen.getByRole('button', { name: 'Refine Pieces' })
    expect(trigger).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()

    await userEvent.click(trigger)
    expect(screen.getByRole('dialog', { name: 'Refine Collection' })).toBeInTheDocument()
    expect(screen.getByText('Filter body content')).toBeInTheDocument()
  })
})
