import CalculatorForm from './CalculatorForm/CalculatorForm'
import CalculatorTaxes from './CalculatorTaxes/CalculatorTaxes'

const mockTaxData = {
  bands: [
    { bandStart: 0, bandEnd: 14000, taxRatePercentage: 11.5, taxCollected: 1610.0 },
    { bandStart: 14000, bandEnd: 48000, taxRatePercentage: 21.0, taxCollected: 7140.0 },
    { bandStart: 48000, bandEnd: 70000, taxRatePercentage: 31.5, taxCollected: 6930.0 },
    { bandStart: 70000, bandEnd: null, taxRatePercentage: 35.5, taxCollected: 10650.0 },
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
