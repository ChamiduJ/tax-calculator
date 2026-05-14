export type TaxBandInput = {
  bandStart: number
  bandEnd: number | null
  taxRate: number
}

export type TaxBand = {
  bandStart: number
  bandEnd: number | null
  taxRatePercentage: number
  taxCollected: number
}

export type TaxData = {
  bands: TaxBand[]
  total: number
}

export type CalculatorFormData = {
  salary: number
}
