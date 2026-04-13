import type { MarketplaceJob } from '../../types'

interface MarketplacePanelProps {
  jobs: MarketplaceJob[]
  usingFallback?: boolean
  error?: string | null
}

export function MarketplacePanel({ jobs, usingFallback = false, error = null }: MarketplacePanelProps) {
  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          <span className="eyebrow">Human fallback network</span>
          <h2>Bring in plumbers, cleaners, carers, or rental specialists only when the task needs it</h2>
          <p>Marketplace flow stays secondary, but it is ready when AI confidence is low or real-world work is required.</p>
          {usingFallback ? <p className="info-text">Showing curated sample jobs while live marketplace supply is still warming up.</p> : null}
          {error ? <p className="error-text">Live feed unavailable: {error}</p> : null}
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="empty-state">
          <strong>No marketplace jobs yet</strong>
          <p>Once a task needs real-world help, it will appear here.</p>
        </div>
      ) : (
        <div className="task-list">
          {jobs.map((job) => (
            <article key={job.id} className="task-row">
              <div>
                <strong>{job.title}</strong>
                <p>{job.category} • {job.location}</p>
                <small>{job.reason}</small>
              </div>
              <div className="task-row__meta">
                <span className={`status-chip status-chip--${job.status}`}>{job.status.replaceAll('_', ' ')}</span>
                <strong>{job.budget}</strong>
                <small>{job.eta}</small>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
