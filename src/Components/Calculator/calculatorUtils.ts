import type { TaxBand, TaxBandInput, TaxData } from './calculator.types'

export const calculateTaxBands = (salary: number, orderedTaxBands: TaxBandInput[]): TaxBand[] => {
  const result: TaxBand[] = []

  for (const { bandStart, bandEnd, taxRate } of orderedTaxBands) {
    const taxableInBand = Math.max(0, Math.min(salary, bandEnd ?? salary) - bandStart)

    if (taxableInBand === 0) break

    result.push({
      bandStart,
      bandEnd,
      taxRatePercentage: taxRate * 100,
      taxCollected: taxableInBand * taxRate,
    })
  }

  return result
}

export const calculate = (salary: number, orderedTaxBands: TaxBandInput[]): TaxData => {
  const bands = calculateTaxBands(salary, orderedTaxBands)
  const total = bands.reduce((sum, band) => sum + band.taxCollected, 0)
  return { bands, total }
}
