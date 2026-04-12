import type { TaskResult } from '../../types'

interface TaskResultPanelProps {
  result: TaskResult | null
}

export function TaskResultPanel({ result }: TaskResultPanelProps) {
  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          <span className="eyebrow">Structured output</span>
          <h2>See what AI prepared before you message, book, or escalate</h2>
          <p>The result panel is built for resident decisions, not chat transcripts.</p>
        </div>
      </div>

      {!result ? (
        <div className="empty-state">
          <strong>No task has been run yet</strong>
          <p>Pick a home scenario, fill the structured form, and GigHub will prepare the first-pass output here.</p>
        </div>
      ) : (
        <>
          <div className="result-summary">
            <span className={`status-chip status-chip--${result.lifecycle}`}>{result.lifecycle.replaceAll('_', ' ')}</span>
            <h3>{result.output.headline}</h3>
            <p>{result.output.summary}</p>
          </div>

          <div className="metrics-row">
            <article className="metric-card">
              <span>Confidence</span>
              <strong>{Math.round(result.confidence * 100)}%</strong>
              <small>How likely AI can complete the task without human follow-up.</small>
            </article>
            <article className="metric-card">
              <span>Quality score</span>
              <strong>{Math.round(result.qualityScore * 100)}%</strong>
              <small>Internal quality estimate for this structured output.</small>
            </article>
            <article className="metric-card">
              <span>Execution mode</span>
              <strong>{result.mode.replaceAll('_', ' ')}</strong>
              <small>{result.fallbackRecommended ? 'Human fallback recommended' : 'AI handled the first pass'}</small>
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
              <h3>Next steps</h3>
              <ul>
                {result.output.nextSteps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="panel__actions">
            {result.routedAgents.map((agent) => (
              <span key={agent} className="pill pill--ghost">{agent}</span>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
