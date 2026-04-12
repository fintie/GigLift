import { Link, useNavigate } from 'react-router-dom'
import { SeoHead } from '../components/SeoHead'
import { scenarioDefinitions } from '../features/scenarios/config'
import { api } from '../services/api'
import { toTaskResult } from '../services/taskAdapters'
import type { CreateTaskPayload, ScenarioType } from '../types'

const showcaseCards = [
  {
    title: 'Repairs',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    to: '/onboarding',
  },
  {
    title: 'Rentals',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    to: '/dashboard',
  },
  {
    title: 'Property intel',
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
    to: '/property-intel',
  },
]

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
    <main className="page-shell landing-page">
      <SeoHead
        title="Property Management System"
        description="Property Management System for Greater Sydney, with lighter visual browsing, quick actions, and property intelligence."
        path="/"
        keywords={[
          'Property Management System',
          'Greater Sydney property management',
          'property operations dashboard',
          'Sydney property intel',
          'repairs management',
          'rental support Sydney',
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Property Management System',
          url: 'https://pms.nextgenius.com.au/',
          description: 'Property Management System for repairs, rentals, operations, and Sydney property intelligence.',
        }}
      />

      <section className="hero-card hero-card--light hero-card--image">
        <div className="hero-card__content">
          <span className="eyebrow">Property Management System</span>
          <h1>Manage properties faster</h1>
          <p>Repairs, rentals, operations, and Sydney property insights in one place.</p>
          <div className="hero-actions">
            <Link className="primary-button" to="/onboarding">
              Get started
            </Link>
            <Link className="secondary-button" to="/property-intel">
              View insights
            </Link>
          </div>
        </div>
        <div className="hero-visual-grid">
          {showcaseCards.map((card) => (
            <Link key={card.title} className="image-tile" to={card.to} style={{ backgroundImage: `url(${card.image})` }}>
              <span>{card.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="panel panel--light">
        <div className="panel__header compact-header">
          <div>
            <span className="eyebrow">Quick actions</span>
            <h2>Start with one click</h2>
          </div>
        </div>
        <div className="quick-start-grid quick-start-grid--visual">
          {scenarioDefinitions.map((scenario) => (
            <article key={scenario.id} className="scenario-card scenario-card--light">
              <span className="scenario-card__segment">{scenario.segment}</span>
              <h3>{scenario.title}</h3>
              <button className="primary-button" type="button" onClick={() => void handleQuickStart(scenario.id)}>
                Open
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel--light feature-strip">
        <article className="mini-feature-card">
          <h3>Repairs</h3>
          <p>Track issues and dispatch faster.</p>
        </article>
        <article className="mini-feature-card">
          <h3>Rentals</h3>
          <p>Keep tenant workflows organised.</p>
        </article>
        <article className="mini-feature-card">
          <h3>Insights</h3>
          <p>See Greater Sydney market signals.</p>
        </article>
      </section>
    </main>
  )
}
