import { useEffect, useMemo, useState } from 'react'
import { DashboardOverview } from '../features/dashboard/DashboardOverview'
import { api } from '../services/api'
import type { ApiTask, DashboardMetric, DashboardTask } from '../types'

function mapTask(task: ApiTask): DashboardTask {
  return {
    id: task.id,
    title: task.title,
    status: task.status,
    owner: task.created_by ?? 'Resident workspace',
    updatedAt: 'Recently updated',
  }
}

export function DashboardPage() {
  const [tasks, setTasks] = useState<ApiTask[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.getTasks()
      .then((response) => setTasks(response.data))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load tasks'))
      .finally(() => setLoading(false))
  }, [])

  const dashboardTasks = useMemo(() => tasks.map(mapTask), [tasks])
  const dashboardMetrics = useMemo<DashboardMetric[]>(() => {
    const escalated = tasks.filter((task) => task.requires_human || task.status === 'posted_to_marketplace' || task.status === 'needs_human').length
    const aiCompleted = tasks.filter((task) => task.status === 'ai_completed' || task.status === 'completed').length

    return [
      { label: 'Total tasks', value: String(tasks.length), detail: 'All resident and household workflows' },
      { label: 'AI completed', value: String(aiCompleted), detail: 'Tasks already resolved or drafted by AI' },
      { label: 'Needs human help', value: String(escalated), detail: 'Tasks routed to fallback or waiting on real-world action' },
    ]
  }, [tasks])

  return (
    <main className="page-shell">
      {loading ? <p className="info-text">Loading dashboard...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
      {!loading ? <DashboardOverview metrics={dashboardMetrics} tasks={dashboardTasks} /> : null}
    </main>
  )
}
