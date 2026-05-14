import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, beforeEach } from 'vitest'
import axios from 'axios'
import Calculator from '../../../Components/Calculator/Calculator'

vi.mock('axios', () => ({
  default: { get: vi.fn() },
}))

const mockedGet = vi.mocked(axios.get)

const TAX_BANDS = [
  { bandStart: 0, bandEnd: 12570, taxRate: 0 },
  { bandStart: 12570, bandEnd: 50270, taxRate: 0.2 },
]

beforeEach(() => {
  mockedGet.mockReset()
})

describe('Calculator', () => {
  it('renders the salary form', () => {
    render(<Calculator />)
    expect(screen.getByLabelText('Salary')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument()
  })

  it('does not show a results table initially', () => {
    render(<Calculator />)
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('fetches tax bands from the correct endpoint', async () => {
    const user = userEvent.setup()
    mockedGet.mockResolvedValueOnce({ data: TAX_BANDS })
    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: /calculate/i }))

    await waitFor(() => expect(mockedGet).toHaveBeenCalledWith('/income-tax-bands.json'))
  })

  it('displays results table after a successful calculation', async () => {
    const user = userEvent.setup()
    mockedGet.mockResolvedValueOnce({ data: TAX_BANDS })
    render(<Calculator />)

    const input = screen.getByLabelText('Salary')
    await user.clear(input)
    await user.type(input, '20000')
    await user.click(screen.getByRole('button', { name: /calculate/i }))

    await waitFor(() => expect(screen.getByRole('table')).toBeInTheDocument())
  })

  it('fetches fresh tax bands on every calculation', async () => {
    const user = userEvent.setup()
    mockedGet.mockResolvedValue({ data: TAX_BANDS })
    render(<Calculator />)

    const button = screen.getByRole('button', { name: /calculate/i })
    await user.click(button)
    await waitFor(() => expect(mockedGet).toHaveBeenCalledTimes(1))

    await user.click(button)
    await waitFor(() => expect(mockedGet).toHaveBeenCalledTimes(2))
  })

  it('shows updated results when recalculating with a new salary', async () => {
    const user = userEvent.setup()
    mockedGet.mockResolvedValue({ data: TAX_BANDS })
    render(<Calculator />)

    const input = screen.getByLabelText('Salary')
    await user.clear(input)
    await user.type(input, '20000')
    await user.click(screen.getByRole('button', { name: /calculate/i }))

    await waitFor(() => expect(screen.getByRole('table')).toBeInTheDocument())

    await user.clear(input)
    await user.type(input, '40000')
    await user.click(screen.getByRole('button', { name: /calculate/i }))

    // net salary = 40000 - 5486 (20% on 27430) = 34514
    await waitFor(() => expect(screen.getByText('34,514')).toBeInTheDocument())
  })
})
