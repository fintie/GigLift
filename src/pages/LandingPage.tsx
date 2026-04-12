import { Link, useNavigate } from 'react-router-dom'
import { SeoHead } from '../components/SeoHead'
import { ScenarioPicker } from '../features/scenarios/ScenarioPicker'
import { scenarioDefinitions } from '../features/scenarios/config'
import { api } from '../services/api'
import { toTaskResult } from '../services/taskAdapters'
import type { CreateTaskPayload, ScenarioType } from '../types'

export function LandingPage() {
  const navigate = useNavigate()

  const handleQuickStart = async (scenarioType: ScenarioType) => {
    const scenario = scenarioDefinitions.find((item) => item.id === scenarioType)
    if (!scenario) return

    const input_data = Object.fromEntries(
      scenario.fields.map((field) => [field.name, field.placeholder ?? field.label]),
    )

    const payload: CreateTaskPayload = {
      title: `${scenario.title} request`,
      description: scenario.summary,
      scenario_type: scenarioType,
      input_data,
      created_by: 'Resident quick start',
      mode: 'AI',
    }

    const created = await api.createTask(payload)
    const run = await api.runTask(created.data.id)

    navigate(`/task/${created.data.id}`, {
      state: {
        result: toTaskResult(run.data.task, run.data.fallbackJob ?? null),
      },
    })
  }

  return (
    <main className="page-shell">
      <SeoHead
        title="GigHub Greater Sydney"
        description="AI-first home task execution for Greater Sydney residents, plus a Sydney property intel page designed for search and AI agents."
        path="/"
        keywords={[
          'GigHub',
          'Greater Sydney home support',
          'AI-first task execution',
          'Sydney property intel',
          'home repairs Sydney',
          'rental support Sydney',
          'AI agent searchable property page',
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'GigHub',
          url: 'https://pms.nextgenius.com.au/',
          description:
            'GigHub helps Greater Sydney residents handle repairs, rental issues, home care, moving help, and property intelligence.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://pms.nextgenius.com.au/property-intel',
            'query-input': 'required name=query',
          },
        }}
      />

      <section className="hero-card">
        <span className="eyebrow">GigHub, Greater Sydney</span>
        <h1>Get home tasks organised, run by AI first, with local human backup when needed</h1>
        <p>
          GigHub is a resident-focused workspace for repairs, rental issues, home care coordination, moving help, and
          Greater Sydney property intelligence. Start with structured inputs, let AI produce the first draft, then
          escalate locally if the job needs a real person.
        </p>
        <div className="hero-actions">
          <Link className="primary-button" to="/onboarding">
            Start guided intake
          </Link>
          <Link className="secondary-button" to="/property-intel">
            Explore Sydney property intel
          </Link>
        </div>
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <span className="eyebrow">Direct use</span>
            <h2>Launch a resident task in one click</h2>
            <p>Good for residents, operators, or AI agents that want a fast structured starting point.</p>
          </div>
        </div>
        <div className="quick-start-grid">
          {scenarioDefinitions.map((scenario) => (
            <article key={scenario.id} className="scenario-card">
              <span className="scenario-card__segment">{scenario.segment}</span>
              <h3>{scenario.title}</h3>
              <p>{scenario.summary}</p>
              <button className="primary-button" type="button" onClick={() => void handleQuickStart(scenario.id)}>
                Run this flow
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <span className="eyebrow">Sydney area insights</span>
            <h2>Separate property intelligence page for search and agent discovery</h2>
            <p>
              Kept separate from the main resident task flow so the core product stays focused, while a crawlable and
              AI-readable housing context layer keeps growing beside it.
            </p>
          </div>
          <Link className="secondary-button" to="/property-intel">
            Open property intel
          </Link>
        </div>
      </section>

      <ScenarioPicker scenarios={scenarioDefinitions} />
    </main>
  )
}
