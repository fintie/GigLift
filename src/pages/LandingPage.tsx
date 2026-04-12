import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardOverview } from '../features/dashboard/DashboardOverview'
import { MarketplacePanel } from '../features/marketplace/MarketplacePanel'
import { OnboardingWizard } from '../features/onboarding/OnboardingWizard'
import {
  dashboardMetrics,
  dashboardTasks,
  defaultOnboardingValues,
  marketplaceJobs,
  scenarioDefinitions,
  getScenarioDefinition,
  createInitialFormValues,
} from '../features/scenarios/config'
import { ScenarioForm } from '../features/scenarios/ScenarioForm'
import { ScenarioPicker } from '../features/scenarios/ScenarioPicker'
import { TaskResultPanel } from '../features/tasks/TaskResultPanel'
import { api } from '../services/api'
import { toTaskResult } from '../services/taskAdapters'
import type { OnboardingFormValues, ScenarioType, TaskResult } from '../types'

export function LandingPage() {
  const navigate = useNavigate()
  const [activeScenarioId, setActiveScenarioId] = useState<ScenarioType>('property-listing')
  const [formValues, setFormValues] = useState<Record<string, string>>(createInitialFormValues('property-listing'))
  const [taskResult, setTaskResult] = useState<TaskResult | null>(null)
  const [onboardingValues, setOnboardingValues] = useState<OnboardingFormValues>(defaultOnboardingValues)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const activeScenario = useMemo(() => getScenarioDefinition(activeScenarioId), [activeScenarioId])

  const handleScenarioSelect = (scenarioId: ScenarioType) => {
    setActiveScenarioId(scenarioId)
    setFormValues(createInitialFormValues(scenarioId))
    setTaskResult(null)
    setError(null)
  }

  const handleFieldChange = (key: string, value: string) => {
    setFormValues((current) => ({ ...current, [key]: value }))
  }

  const handleRunTask = async () => {
    try {
      setIsSubmitting(true)
      setError(null)

      const title = activeScenario.title
      const description = activeScenario.summary
      const { data: task } = await api.createTask({
        title,
        description,
        scenario_type: activeScenarioId,
        input_data: formValues,
        created_by: 'giglift-web',
      })

      const { data: execution } = await api.runTask(task.id)
      const mappedResult = toTaskResult(task, execution)
      setTaskResult(mappedResult)
      navigate(`/task/${task.id}`, { state: { result: mappedResult } })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run task')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOnboardingChange = <K extends keyof OnboardingFormValues>(key: K, value: OnboardingFormValues[K]) => {
    setOnboardingValues((current) => ({ ...current, [key]: value }))
  }

  const handleSendToHuman = async () => {
    if (!taskResult) return
    try {
      await api.sendTaskToHuman(taskResult.taskId)
      navigate('/marketplace')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send task to marketplace')
    }
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
            <button className="secondary-button" type="button" onClick={() => navigate('/dashboard')}>View dashboard</button>
          </div>
          {error ? <p className="error-text">{error}</p> : null}
          {isSubmitting ? <p className="info-text">Running task...</p> : null}
        </div>

        <div className="hero-sidecard">
          <span className="pill">AI first. Human second.</span>
          <ul>
            <li>Scenario-led intake</li>
            <li>Structured outputs</li>
            <li>Human fallback marketplace</li>
            <li>Operator dashboard and onboarding</li>
          </ul>
          {taskResult?.fallbackRecommended ? (
            <button className="secondary-button" type="button" onClick={handleSendToHuman}>
              Send latest task to human fallback
            </button>
          ) : null}
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
