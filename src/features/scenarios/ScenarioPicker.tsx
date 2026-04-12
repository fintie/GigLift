import type { ScenarioDefinition, ScenarioType } from '../../types'
import { ScenarioCard } from './ScenarioCard'

interface ScenarioPickerProps {
  scenarios: ScenarioDefinition[]
  activeScenarioId: ScenarioType
  onSelect: (id: ScenarioType) => void
}

export function ScenarioPicker({ scenarios, activeScenarioId, onSelect }: ScenarioPickerProps) {
  return (
    <section className="scenario-grid">
      {scenarios.map((scenario) => (
        <ScenarioCard
          key={scenario.id}
          scenario={scenario}
          active={scenario.id === activeScenarioId}
          onSelect={onSelect}
        />
      ))}
    </section>
  )
}
