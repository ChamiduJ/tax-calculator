import { useState } from 'react'
import CalculatorForm from './CalculatorForm/CalculatorForm'
import CalculatorTaxes from './CalculatorTaxes/CalculatorTaxes'
import { calculate } from './calculatorUtils'
import type { TaxBandInput, TaxData } from './calculator.types'

const mockBands: TaxBandInput[] = [
  { bandStart: 0,     bandEnd: 14000, taxRate: 0.1150 },
  { bandStart: 14000, bandEnd: 48000, taxRate: 0.2100 },
  { bandStart: 48000, bandEnd: 70000, taxRate: 0.3150 },
  { bandStart: 70000, bandEnd: null,  taxRate: 0.3550 },
]

const Calculator = () => {
  const [taxData, setTaxData] = useState<TaxData | null>(null)

  const handleSubmit = ({ salary }: { salary: number }) => {
    setTaxData(calculate(salary, mockBands))
  }

  return (
    <div>
      <CalculatorForm onSubmit={handleSubmit} />
      {taxData && <CalculatorTaxes taxData={taxData} />}
    </div>
  )
}

export default Calculator
