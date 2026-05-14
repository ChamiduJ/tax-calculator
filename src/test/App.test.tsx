import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import App from '../App'

vi.mock('axios', () => ({
  default: { get: vi.fn() },
}))

describe('App', () => {
  it('renders the tax calculator heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /tax calculator/i })).toBeInTheDocument()
  })

  it('renders the calculator form', () => {
    render(<App />)
    expect(screen.getByLabelText('Salary')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument()
  })

  it('does not show results table on initial render', () => {
    render(<App />)
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})
