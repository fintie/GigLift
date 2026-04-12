import { useMemo, useState } from 'react'
import { DashboardOverview } from '../features/dashboard/DashboardOverview'
import { MarketplacePanel } from '../features/marketplace/MarketplacePanel'
import { OnboardingWizard } from '../features/onboarding/OnboardingWizard'
import {
  buildMockTaskResult,
  createInitialFormValues,
  dashboardMetrics,
  dashboardTasks,
  defaultOnboardingValues,
  getScenarioDefinition,
  marketplaceJobs,
  scenarioDefinitions,
} from '../features/scenarios/config'
import { ScenarioForm } from '../features/scenarios/ScenarioForm'
import { ScenarioPicker } from '../features/scenarios/ScenarioPicker'
import { TaskResultPanel } from '../features/tasks/TaskResultPanel'
import type { OnboardingFormValues, ScenarioType, TaskResult } from '../types'

export function LandingPage() {
  const [activeScenarioId, setActiveScenarioId] = useState<ScenarioType>('property-listing')
  const [formValues, setFormValues] = useState<Record<string, string>>(createInitialFormValues('property-listing'))
  const [taskResult, setTaskResult] = useState<TaskResult | null>(null)
  const [onboardingValues, setOnboardingValues] = useState<OnboardingFormValues>(defaultOnboardingValues)

  const activeScenario = useMemo(() => getScenarioDefinition(activeScenarioId), [activeScenarioId])

  const handleScenarioSelect = (scenarioId: ScenarioType) => {
    setActiveScenarioId(scenarioId)
    setFormValues(createInitialFormValues(scenarioId))
    setTaskResult(null)
  }

  const handleFieldChange = (key: string, value: string) => {
    setFormValues((current) => ({ ...current, [key]: value }))
  }

  const handleRunTask = () => {
    setTaskResult(buildMockTaskResult(activeScenarioId, formValues))
  }

  const handleOnboardingChange = <K extends keyof OnboardingFormValues>(key: K, value: OnboardingFormValues[K]) => {
    setOnboardingValues((current) => ({ ...current, [key]: value }))
  }

  return (
    <main className="page-shell">
      <header className="hero-shell">
        <div className="hero-copy">
          <span className="eyebrow">GigHub, AI-first task execution for Australian SMEs</span>
          <h1>Keep the current GigLift feel, but make it launch-ready.</h1>
          <p>
            AI handles intake, structure, and first-pass execution. Humans step in only when confidence is low,
            physical work is needed, or the operator wants review.
          </p>
          <div className="hero-actions">
            <button className="primary-button" type="button">Start a request</button>
            <button className="secondary-button" type="button">View dashboard</button>
          </div>
        </div>

        <div className="hero-sidecard">
          <span className="pill">AI first. Human second.</span>
          <ul>
            <li>Scenario-led intake</li>
            <li>Structured outputs</li>
            <li>Human fallback marketplace</li>
            <li>Operator dashboard and onboarding</li>
          </ul>
        </div>
      </header>

      <ScenarioPicker scenarios={scenarioDefinitions} activeScenarioId={activeScenarioId} onSelect={handleScenarioSelect} />

      <section className="workspace-grid">
        <ScenarioForm scenario={activeScenario} values={formValues} onChange={handleFieldChange} onSubmit={handleRunTask} />
        <TaskResultPanel result={taskResult} />
      </section>

      <DashboardOverview metrics={dashboardMetrics} tasks={dashboardTasks} />

      <section className="workspace-grid workspace-grid--secondary">
        <OnboardingWizard values={onboardingValues} onChange={handleOnboardingChange} />
        <MarketplacePanel jobs={marketplaceJobs} />
      </section>
    </main>
  )
}
