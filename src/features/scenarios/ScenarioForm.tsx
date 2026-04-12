import type { ScenarioDefinition } from '../../types'

interface ScenarioFormProps {
  scenario: ScenarioDefinition
  values: Record<string, string>
  onChange: (key: string, value: string) => void
  onSubmit: () => void
}

export function ScenarioForm({ scenario, values, onChange, onSubmit }: ScenarioFormProps) {
  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          <span className="eyebrow">Structured intake</span>
          <h2>{scenario.title}</h2>
          <p>{scenario.summary}</p>
        </div>
        <span className="pill">{scenario.mode.replaceAll('_', ' ')}</span>
      </div>

      <div className="form-grid">
        {scenario.fields.map((field) => {
          const isFull = field.type === 'textarea'
          return (
            <label key={field.key} className={`field ${isFull ? 'field--full' : ''}`}>
              <span>{field.label}</span>
              {field.type === 'textarea' ? (
                <textarea value={values[field.key] ?? ''} placeholder={field.placeholder} onChange={(event) => onChange(field.key, event.target.value)} />
              ) : field.type === 'select' ? (
                <select value={values[field.key] ?? ''} onChange={(event) => onChange(field.key, event.target.value)}>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ) : (
                <input type={field.type} value={values[field.key] ?? ''} placeholder={field.placeholder} onChange={(event) => onChange(field.key, event.target.value)} />
              )}
            </label>
          )
        })}
      </div>

      <div className="panel__actions">
        <button type="button" className="primary-button" onClick={onSubmit}>Run this home task</button>
      </div>
    </section>
  )
}
