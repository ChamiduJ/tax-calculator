import { useState } from 'react'
import axios from 'axios'
import CalculatorForm from './CalculatorForm/CalculatorForm'
import CalculatorTaxes from './CalculatorTaxes/CalculatorTaxes'
import { calculate } from './calculatorUtils'
import type { TaxBandInput, TaxData } from './calculator.types'

const Calculator = () => {
  const [taxData, setTaxData] = useState<TaxData | null>(null)

  const handleSubmit = async ({ salary }: { salary: number }) => {
    /**
     * Dev comments
     * Retrieving tax bands on each click ensures up-to-date rates.
     * Implementing a frontend cache can improve performance, but rates will not update until the application is reloaded.
     * Implementing a cache with proper invalidation can improve performance while keeping rates up to date.
     */

    const { data: taxBands } = await axios.get<TaxBandInput[]>('/income-tax-bands.json')
    setTaxData(calculate(salary, taxBands))
  }

  return (
    <div>
      <CalculatorForm onSubmit={handleSubmit} />
      {taxData && <CalculatorTaxes taxData={taxData} />}
    </div>
  )
}

export default Calculator
