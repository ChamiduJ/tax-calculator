export type TaxBand = {
  bandStart: number
  bandFinish: number | null
  taxRate: number
  taxCollected: number
}

export type CalculatorFormData = {
  salary: number
}
