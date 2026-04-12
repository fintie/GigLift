import type { DashboardMetric, DashboardTask } from '../../types'

interface DashboardOverviewProps {
  metrics: DashboardMetric[]
  tasks: DashboardTask[]
}

export function DashboardOverview({ metrics, tasks }: DashboardOverviewProps) {
  return (
    <section className="panel dashboard-shell">
      <div className="panel__header">
        <div>
          <span className="eyebrow">Home operations dashboard</span>
          <h2>Track the household tasks that AI can progress before humans step in</h2>
          <p>See what GigHub already structured, what still needs a person on site, and what is ready to send.</p>
        </div>
      </div>

      <div className="metrics-row">
        {metrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.detail}</small>
          </article>
        ))}
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <article key={task.id} className="task-row">
            <div>
              <strong>{task.title}</strong>
              <p>{task.owner}</p>
            </div>
            <div className="task-row__meta">
              <span className={`status-chip status-chip--${task.status}`}>{task.status.replaceAll('_', ' ')}</span>
              <small>{task.updatedAt}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
