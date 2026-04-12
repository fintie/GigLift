import { useState } from 'react'
import { OnboardingWizard } from '../features/onboarding/OnboardingWizard'
import { defaultOnboardingValues } from '../features/scenarios/config'
import type { OnboardingFormValues } from '../types'

export function OnboardingPage() {
  const [values, setValues] = useState<OnboardingFormValues>(defaultOnboardingValues)

  const handleChange = <K extends keyof OnboardingFormValues>(key: K, value: OnboardingFormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }))
  }

  return (
    <main className="page-shell">
      <OnboardingWizard values={values} onChange={handleChange} />
    </main>
  )
}
