import { describe, it, expect } from 'vitest'
import {
  roundToCurrency,
  formatToCurrency,
  calculateTaxBands,
  calculate,
} from '../../../Components/Calculator/calculatorUtils'
import type { TaxBandInput } from '../../../Components/Calculator/calculator.types'

const TAX_BANDS: TaxBandInput[] = [
  { bandStart: 0, bandEnd: 12570, taxRate: 0 },
  { bandStart: 12570, bandEnd: 50270, taxRate: 0.2 },
  { bandStart: 50270, bandEnd: null, taxRate: 0.4 },
]

describe('roundToCurrency', () => {
  it('rounds to 2 decimal places', () => {
    expect(roundToCurrency(1.236)).toBe(1.24)
    expect(roundToCurrency(1.234)).toBe(1.23)
    expect(roundToCurrency(100)).toBe(100)
  })

  it('handles zero', () => {
    expect(roundToCurrency(0)).toBe(0)
  })

  it('handles already rounded values', () => {
    expect(roundToCurrency(9.99)).toBe(9.99)
  })
})

describe('formatToCurrency', () => {
  it('formats whole numbers without trailing decimals', () => {
    expect(formatToCurrency(100)).toBe('100')
    expect(formatToCurrency(0)).toBe('0')
  })

  it('formats decimal values without trailing zeros', () => {
    expect(formatToCurrency(1.5)).toBe('1.5')
  })

  it('adds thousand separators for large numbers', () => {
    expect(formatToCurrency(1234567)).toBe('1,234,567')
    expect(formatToCurrency(1234.5)).toBe('1,234.5')
  })
})

describe('calculateTaxBands', () => {
  it('returns empty array for salary of 0', () => {
    expect(calculateTaxBands(0, TAX_BANDS)).toEqual([])
  })

  it('stops early when salary does not reach a band', () => {
    const result = calculateTaxBands(5000, TAX_BANDS)
    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      bandStart: 0,
      bandEnd: 12570,
      taxRatePercentage: 0,
      taxCollected: 0,
    })
  })

  it('calculates bands for salary within the first two bands', () => {
    const result = calculateTaxBands(20000, TAX_BANDS)
    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({
      bandStart: 0,
      bandEnd: 12570,
      taxRatePercentage: 0,
      taxCollected: 0,
    })
    expect(result[1]).toEqual({
      bandStart: 12570,
      bandEnd: 50270,
      taxRatePercentage: 20,
      taxCollected: 1486,
    })
  })

  it('calculates bands for salary spanning all bands including open-ended', () => {
    const result = calculateTaxBands(60000, TAX_BANDS)
    expect(result).toHaveLength(3)
    expect(result[2]).toEqual({
      bandStart: 50270,
      bandEnd: null,
      taxRatePercentage: 40,
      taxCollected: 3892,
    })
  })

  it('uses salary as cap for open-ended band (null bandEnd)', () => {
    const simpleBands: TaxBandInput[] = [{ bandStart: 0, bandEnd: null, taxRate: 0.2 }]
    const result = calculateTaxBands(10000, simpleBands)
    expect(result).toHaveLength(1)
    expect(result[0].taxCollected).toBe(2000)
  })

  it('converts taxRate to taxRatePercentage', () => {
    const result = calculateTaxBands(60000, TAX_BANDS)
    expect(result[0].taxRatePercentage).toBe(0)
    expect(result[1].taxRatePercentage).toBe(20)
    expect(result[2].taxRatePercentage).toBe(40)
  })
})

describe('calculate', () => {
  it('returns net salary as salary minus total tax', () => {
    // 20% on 7430 = 1486 tax, net = 20000 - 1486 = 18514
    expect(calculate(20000, TAX_BANDS).netSalary).toBe(18514)
  })

  it('returns zero total and net salary equal to gross for zero salary', () => {
    const result = calculate(0, TAX_BANDS)
    expect(result.total).toBe(0)
    expect(result.bands).toHaveLength(0)
    expect(result.netSalary).toBe(0)
  })

  it('returns correct total summed across all bands', () => {
    // 0% on 12570 = 0, 20% on 37700 = 7540, 40% on 9730 = 3892
    const result = calculate(60000, TAX_BANDS)
    expect(result.total).toBe(11432)
    expect(result.bands).toHaveLength(3)
  })

  it('returns correct net salary for salary spanning all bands', () => {
    // total tax = 11432, net = 60000 - 11432 = 48568
    const result = calculate(60000, TAX_BANDS)
    expect(result.netSalary).toBe(48568)
  })

  it('returns correct total for salary within first two bands', () => {
    // 0% on 12570 = 0, 20% on 7430 = 1486
    const result = calculate(20000, TAX_BANDS)
    expect(result.total).toBe(1486)
  })
})
