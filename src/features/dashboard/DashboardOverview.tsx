import type { DashboardMetric, DashboardTask } from '../../types'

interface DashboardOverviewProps {
  metrics: DashboardMetric[]
  tasks: DashboardTask[]
}

export function DashboardOverview({ metrics, tasks }: DashboardOverviewProps) {
  return (
    <section className="dashboard-shell">
      <div className="panel">
        <div className="panel__header">
          <div>
            <span className="eyebrow">Dashboard</span>
            <h2>Business command centre</h2>
          </div>
        </div>

        <div className="metrics-row">
          {metrics.map((metric) => (
            <article key={metric.label} className="metric-card">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <small>{metric.detail}</small>
            </article>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel__header">
          <div>
            <span className="eyebrow">Pending work</span>
            <h2>What needs attention now</h2>
          </div>
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
      </div>
    </section>
  )
}
