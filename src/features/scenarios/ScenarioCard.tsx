import type { ScenarioDefinition } from '../../types'

interface ScenarioCardProps {
  scenario: ScenarioDefinition
  isActive: boolean
  onSelect: () => void
}

export function ScenarioCard({ scenario, isActive, onSelect }: ScenarioCardProps) {
  return (
    <button type="button" className={`scenario-card ${isActive ? 'scenario-card--active' : ''}`} onClick={onSelect}>
      <span className="scenario-card__segment">{scenario.segment}</span>
      <h3>{scenario.title}</h3>
      <p>{scenario.summary}</p>
      <span className="scenario-card__mode">{scenario.mode.replaceAll('_', ' ')}</span>
    </button>
  )
}
