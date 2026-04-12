import type { ScenarioDefinition } from '../../types'

interface ScenarioFormProps {
  scenario: ScenarioDefinition
  values: Record<string, string>
  onChange: (key: string, value: string) => void
  onSubmit: () => void
}

export function ScenarioForm({ scenario, values, onChange, onSubmit }: ScenarioFormProps) {
  return (
    <section className="panel panel--form">
      <div className="panel__header">
        <div>
          <span className="eyebrow">Task intake</span>
          <h2>{scenario.title}</h2>
        </div>
        <span className="pill">{scenario.segment}</span>
      </div>

      <div className="form-grid">
        {scenario.fields.map((field) => (
          <label key={field.key} className={`field ${field.type === 'textarea' ? 'field--full' : ''}`}>
            <span>{field.label}</span>
            {field.type === 'textarea' ? (
              <textarea
                value={values[field.key] ?? ''}
                placeholder={field.placeholder}
                onChange={(event) => onChange(field.key, event.target.value)}
              />
            ) : field.type === 'select' ? (
              <select value={values[field.key] ?? ''} onChange={(event) => onChange(field.key, event.target.value)}>
                <option value="">Select</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={values[field.key] ?? ''}
                placeholder={field.placeholder}
                onChange={(event) => onChange(field.key, event.target.value)}
              />
            )}
          </label>
        ))}
      </div>

      <div className="panel__actions">
        <button className="primary-button" type="button" onClick={onSubmit}>
          Run task
        </button>
        <button className="secondary-button" type="button">
          Save draft
        </button>
      </div>
    </section>
  )
}
