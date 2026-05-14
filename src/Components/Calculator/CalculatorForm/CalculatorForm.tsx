import { useState, type FC, type SubmitEvent } from 'react'
import s from './styles.module.scss'

type CalculatorFormData = {
  salary: number
}

type CalculatorFormProps = {
  onSubmit: (data: CalculatorFormData) => void
}

const CalculatorForm: FC<CalculatorFormProps> = ({ onSubmit }) => {
  const [salary, setSalary] = useState<number>(0)

  const handleCalculate = (event: SubmitEvent) => {
    event.preventDefault()
    onSubmit({ salary })
  }

  return (
    <form onSubmit={handleCalculate} className={s.calculatorForm}>
      <div>
        <label htmlFor="salary">Salary</label>
        <input
          id="salary"
          type="number"
          min="0"
          step="0.01"
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value ?? 0))}
          placeholder="Salary"
          required
        />
      </div>

      <button type="submit">Calculate</button>
    </form>
  )
}

export default CalculatorForm
