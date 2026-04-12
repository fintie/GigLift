import type { TaskResult } from '../../types'

interface TaskResultPanelProps {
  result: TaskResult | null
}

export function TaskResultPanel({ result }: TaskResultPanelProps) {
  if (!result) {
    return (
      <section className="panel panel--result">
        <div className="panel__header">
          <div>
            <span className="eyebrow">Execution output</span>
            <h2>Results appear here</h2>
          </div>
        </div>
        <div className="empty-state">
          <p>Run a scenario to generate structured output, routing recommendations, and fallback actions.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="panel panel--result">
      <div className="panel__header">
        <div>
          <span className="eyebrow">Execution output</span>
          <h2>{result.output.headline}</h2>
        </div>
        <span className={`status-chip status-chip--${result.lifecycle}`}>{result.lifecycle.replaceAll('_', ' ')}</span>
      </div>

      <p className="result-summary">{result.output.summary}</p>

      <div className="metrics-row">
        <article className="metric-card">
          <strong>{Math.round(result.confidence * 100)}%</strong>
          <span>AI confidence</span>
        </article>
        <article className="metric-card">
          <strong>{Math.round(result.qualityScore * 100)}%</strong>
          <span>Quality score</span>
        </article>
        <article className="metric-card">
          <strong>{result.mode === 'ai_instant' ? 'Instant' : result.mode === 'hybrid' ? 'Hybrid' : 'Human'}</strong>
          <span>Workflow mode</span>
        </article>
      </div>

      <div className="result-columns">
        <div>
          <h3>Deliverables</h3>
          <ul>
            {result.output.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Next actions</h3>
          <ul>
            {result.output.nextSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="agent-stack">
        {result.routedAgents.map((agent) => (
          <span key={agent} className="pill pill--ghost">
            {agent}
          </span>
        ))}
      </div>
    </section>
  )
}
