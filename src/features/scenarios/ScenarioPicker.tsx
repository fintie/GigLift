import type { ScenarioDefinition, ScenarioType } from '../../types'
import { ScenarioCard } from './ScenarioCard'

interface ScenarioPickerProps {
  scenarios: ScenarioDefinition[]
  activeScenarioId: ScenarioType
  onSelect: (scenarioId: ScenarioType) => void
}

export function ScenarioPicker({ scenarios, activeScenarioId, onSelect }: ScenarioPickerProps) {
  return (
    <section>
      <div className="panel__header">
        <div>
          <span className="eyebrow">Home resident scenarios</span>
          <h2>Start from the real issue happening around the home</h2>
        </div>
      </div>
      <div className="scenario-grid">
        {scenarios.map((scenario) => (
          <ScenarioCard key={scenario.id} scenario={scenario} isActive={scenario.id === activeScenarioId} onSelect={() => onSelect(scenario.id)} />
        ))}
      </div>
    </section>
  )
}
