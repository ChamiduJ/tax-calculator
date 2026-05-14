import type { FC } from 'react'
import s from './styles.module.scss'
import type { TaxBand } from '../calculator.types'

type CalculatorTaxesProps = {
  taxData: {
    bands: TaxBand[]
    total: number
  }
}

const CalculatorTaxes: FC<CalculatorTaxesProps> = ({ taxData: { bands, total } }) => (
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
          <td>{band.bandStart}</td>
          <td>{band.bandEnd}</td>
          <td>{band.taxRatePercentage}%</td>
          <td>{band.taxCollected}</td>
        </tr>
      ))}
      <tr>
        <td colSpan={3}>
          <b>Total</b>
        </td>
        <td>
          <b>{total}</b>
        </td>
      </tr>
    </tbody>
  </table>
)

export default CalculatorTaxes
