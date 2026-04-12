import type { OnboardingFormValues } from '../../types'
import { onboardingGoals } from '../scenarios/config'

interface OnboardingWizardProps {
  values: OnboardingFormValues
  onChange: <K extends keyof OnboardingFormValues>(key: K, value: OnboardingFormValues[K]) => void
}

export function OnboardingWizard({ values, onChange }: OnboardingWizardProps) {
  const toggleGoal = (goal: string) => {
    const hasGoal = values.goals.includes(goal)
    onChange(
      'goals',
      hasGoal ? values.goals.filter((item) => item !== goal) : [...values.goals, goal],
    )
  }

  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          <span className="eyebrow">Onboarding</span>
          <h2>Set up GigHub for your business</h2>
        </div>
      </div>

      <div className="form-grid">
        <label className="field">
          <span>Role</span>
          <select value={values.role} onChange={(event) => onChange('role', event.target.value as OnboardingFormValues['role'])}>
            <option value="business_owner">Business owner</option>
            <option value="operator_admin">Operator/admin</option>
            <option value="provider">Freelancer / provider</option>
          </select>
        </label>

        <label className="field">
          <span>Industry</span>
          <select value={values.industry} onChange={(event) => onChange('industry', event.target.value as OnboardingFormValues['industry'])}>
            <option value="real_estate">Real estate</option>
            <option value="aged_care">Aged care</option>
            <option value="restaurant">Restaurant</option>
            <option value="retail">Retail</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label className="field">
          <span>Business size</span>
          <select value={values.businessSize} onChange={(event) => onChange('businessSize', event.target.value as OnboardingFormValues['businessSize'])}>
            <option value="solo">Solo</option>
            <option value="2_10">2-10 staff</option>
            <option value="11_50">11-50 staff</option>
            <option value="51_200">51-200 staff</option>
          </select>
        </label>
      </div>

      <div className="goal-grid">
        {onboardingGoals.map((goal) => (
          <button
            key={goal}
            type="button"
            className={`goal-chip ${values.goals.includes(goal) ? 'goal-chip--active' : ''}`}
            onClick={() => toggleGoal(goal)}
          >
            {goal}
          </button>
        ))}
      </div>
    </section>
  )
}
