import type { OnboardingFormValues } from '../../types'
import { onboardingGoals } from '../scenarios/config'

interface OnboardingWizardProps {
  values: OnboardingFormValues
  onChange: <K extends keyof OnboardingFormValues>(key: K, value: OnboardingFormValues[K]) => void
}

export function OnboardingWizard({ values, onChange }: OnboardingWizardProps) {
  const toggleGoal = (goal: string) => {
    const nextGoals = values.goals.includes(goal)
      ? values.goals.filter((item) => item !== goal)
      : [...values.goals, goal]

    onChange('goals', nextGoals)
  }

  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          <span className="eyebrow">Resident onboarding</span>
          <h2>Set up your home task workspace</h2>
          <p>Tell the system who lives in the home and what kinds of property issues need attention most often.</p>
        </div>
      </div>

      <div className="form-grid">
        <label className="field">
          <span>I am mainly a...</span>
          <select value={values.role} onChange={(event) => onChange('role', event.target.value as OnboardingFormValues['role'])}>
            <option value="resident">Resident</option>
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
            <option value="family_carer">Family carer</option>
          </select>
        </label>

        <label className="field">
          <span>Primary home setup</span>
          <select value={values.industry} onChange={(event) => onChange('industry', event.target.value as OnboardingFormValues['industry'])}>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="rental_property">Rental property</option>
            <option value="supported_living">Supported living</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label className="field field--full">
          <span>Household type</span>
          <select value={values.businessSize} onChange={(event) => onChange('businessSize', event.target.value as OnboardingFormValues['businessSize'])}>
            <option value="just_me">Just me</option>
            <option value="couple">Couple</option>
            <option value="family">Family household</option>
            <option value="multi_property">Managing multiple properties</option>
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
