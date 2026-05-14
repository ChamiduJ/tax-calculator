import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import CalculatorForm from '../../../../Components/Calculator/CalculatorForm/CalculatorForm'

describe('CalculatorForm', () => {
  it('renders the salary input and calculate button', () => {
    render(<CalculatorForm onSubmit={vi.fn()} />)
    expect(screen.getByLabelText('Salary')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument()
  })

  it('defaults salary to 0', () => {
    render(<CalculatorForm onSubmit={vi.fn()} />)
    expect(screen.getByLabelText('Salary')).toHaveValue(0)
  })

  it('updates salary value on input change', async () => {
    const user = userEvent.setup()
    render(<CalculatorForm onSubmit={vi.fn()} />)

    const input = screen.getByLabelText('Salary')
    await user.clear(input)
    await user.type(input, '25000')

    expect(input).toHaveValue(25000)
  })

  it('calls onSubmit with entered salary on form submit', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<CalculatorForm onSubmit={onSubmit} />)

    const input = screen.getByLabelText('Salary')
    await user.clear(input)
    await user.type(input, '50000')
    await user.click(screen.getByRole('button', { name: /calculate/i }))

    expect(onSubmit).toHaveBeenCalledOnce()
    expect(onSubmit).toHaveBeenCalledWith({ salary: 50000 })
  })

  it('calls onSubmit with 0 when salary is cleared', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<CalculatorForm onSubmit={onSubmit} />)

    await user.clear(screen.getByLabelText('Salary'))
    await user.click(screen.getByRole('button', { name: /calculate/i }))

    expect(onSubmit).toHaveBeenCalledWith({ salary: 0 })
  })

  it('salary input has correct attributes', () => {
    render(<CalculatorForm onSubmit={vi.fn()} />)
    const input = screen.getByLabelText('Salary')
    expect(input).toHaveAttribute('type', 'number')
    expect(input).toHaveAttribute('min', '0')
    expect(input).toHaveAttribute('step', '0.01')
    expect(input).toBeRequired()
  })
})
