import type { ScenarioDefinition } from '../../types'

interface ScenarioCardProps {
  scenario: ScenarioDefinition
  active: boolean
  onSelect: (id: ScenarioDefinition['id']) => void
}

export function ScenarioCard({ scenario, active, onSelect }: ScenarioCardProps) {
  return (
    <button
      type="button"
      className={`scenario-card ${active ? 'scenario-card--active' : ''}`}
      onClick={() => onSelect(scenario.id)}
    >
      <span className="scenario-card__segment">{scenario.segment}</span>
      <h3>{scenario.title}</h3>
      <p>{scenario.summary}</p>
      <span className="scenario-card__mode">{scenario.mode === 'ai_instant' ? 'AI Instant' : 'Hybrid AI + Human'}</span>
    </button>
  )
}
