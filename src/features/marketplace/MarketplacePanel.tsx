import type { MarketplaceJob } from '../../types'

interface MarketplacePanelProps {
  jobs: MarketplaceJob[]
}

export function MarketplacePanel({ jobs }: MarketplacePanelProps) {
  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          <span className="eyebrow">Marketplace fallback</span>
          <h2>Human-in-the-loop coverage</h2>
        </div>
      </div>

      <div className="task-list">
        {jobs.map((job) => (
          <article key={job.id} className="task-row">
            <div>
              <strong>{job.title}</strong>
              <p>
                {job.category} · {job.location}
              </p>
            </div>
            <div className="task-row__meta">
              <span>{job.budget}</span>
              <small>{job.eta}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
