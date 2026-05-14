import type { FC } from 'react'
import s from './styles.module.scss'
import type { TaxData } from '../calculator.types'
import { formatToCurrency } from '../calculatorUtils'

type CalculatorTaxesProps = {
  taxData: TaxData
}

const CalculatorTaxes: FC<CalculatorTaxesProps> = ({ taxData: { bands, total, netSalary } }) => (
  <table className={s.calculatorTaxes}>
    <thead>
      <tr>
        <th>Band Start</th>
        <th>Band Finish</th>
        <th>Tax Rate</th>
        <th>Tax Collected</th>
      </tr>
    </thead>
    <tbody>
      {bands.map((band, index) => (
        <tr key={index}>
          <td>{formatToCurrency(band.bandStart)}</td>
          <td>{band.bandEnd !== null ? formatToCurrency(band.bandEnd) : '—'}</td>
          <td>{formatToCurrency(band.taxRatePercentage)}%</td>
          <td>{formatToCurrency(band.taxCollected)}</td>
        </tr>
      ))}
      <tr>
        <td colSpan={3}>
          <b>Total tax</b>
        </td>
        <td>
          <b>{formatToCurrency(total)}</b>
        </td>
      </tr>
      <tr>
        <td colSpan={3}>
          <b>Net Salary</b>
        </td>
        <td>
          <b>{formatToCurrency(netSalary)}</b>
        </td>
      </tr>
    </tbody>
  </table>
)

export default CalculatorTaxes
