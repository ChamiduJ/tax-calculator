import CalculatorForm from './CalculatorForm/CalculatorForm'
import CalculatorTaxes from './CalculatorTaxes/CalculatorTaxes'

const mockTaxData = {
  bands: [
    { bandStart: 0, bandFinish: 14000, taxRate: 11.5, taxCollected: 1610.0 },
    { bandStart: 14000, bandFinish: 48000, taxRate: 21.0, taxCollected: 7140.0 },
    { bandStart: 48000, bandFinish: 70000, taxRate: 31.5, taxCollected: 6930.0 },
    { bandStart: 70000, bandFinish: null, taxRate: 35.5, taxCollected: 10650.0 },
  ],
  total: 26330.0,
}

const Calculator = () => (
  <div>
    <CalculatorForm onSubmit={() => {}} />
    <CalculatorTaxes taxData={mockTaxData} />
  </div>
)

export default Calculator
