import { render, screen } from '@testing-library/react'
import CalculatorTaxes from '../../../../Components/Calculator/CalculatorTaxes/CalculatorTaxes'
import type { TaxData } from '../../../../Components/Calculator/calculator.types'

const taxData: TaxData = {
  netSalary: 48568,
  total: 11432,
  bands: [
    { bandStart: 0, bandEnd: 12570, taxRatePercentage: 0, taxCollected: 0 },
    { bandStart: 12570, bandEnd: 50270, taxRatePercentage: 20, taxCollected: 7540 },
    { bandStart: 50270, bandEnd: null, taxRatePercentage: 40, taxCollected: 3892 },
  ],
}

describe('CalculatorTaxes', () => {
  it('renders all table headers', () => {
    render(<CalculatorTaxes taxData={taxData} />)
    expect(screen.getByText('Band Start')).toBeInTheDocument()
    expect(screen.getByText('Band Finish')).toBeInTheDocument()
    expect(screen.getByText('Tax Rate')).toBeInTheDocument()
    expect(screen.getByText('Tax Collected')).toBeInTheDocument()
  })

  it('renders a row for each tax band plus summary rows', () => {
    render(<CalculatorTaxes taxData={taxData} />)
    // 1 header + 3 band rows + 2 summary rows (total + net salary)
    expect(screen.getAllByRole('row')).toHaveLength(6)
  })

  it('displays tax rate as percentage', () => {
    render(<CalculatorTaxes taxData={taxData} />)
    expect(screen.getByText('0%')).toBeInTheDocument()
    expect(screen.getByText('20%')).toBeInTheDocument()
    expect(screen.getByText('40%')).toBeInTheDocument()
  })

  it('displays em dash for null band end', () => {
    render(<CalculatorTaxes taxData={taxData} />)
    expect(screen.getByText('—')).toBeInTheDocument()
  })

  it('displays numeric band end with thousand separators', () => {
    render(<CalculatorTaxes taxData={taxData} />)
    // 50,270 appears as band 2's end AND band 3's start
    expect(screen.getAllByText('50,270')).toHaveLength(2)
  })

  it('displays tax collected per band', () => {
    render(<CalculatorTaxes taxData={taxData} />)
    expect(screen.getByText('7,540')).toBeInTheDocument()
    expect(screen.getByText('3,892')).toBeInTheDocument()
  })

  it('displays total tax label and value', () => {
    render(<CalculatorTaxes taxData={taxData} />)
    expect(screen.getByText('Total tax')).toBeInTheDocument()
    expect(screen.getByText('11,432')).toBeInTheDocument()
  })

  it('displays net salary label and value', () => {
    render(<CalculatorTaxes taxData={taxData} />)
    expect(screen.getByText('Net Salary')).toBeInTheDocument()
    expect(screen.getByText('48,568')).toBeInTheDocument()
  })

  it('renders a table element', () => {
    render(<CalculatorTaxes taxData={taxData} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })
})
