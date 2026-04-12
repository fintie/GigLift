import { useEffect, useState } from 'react'
import { DashboardOverview } from '../features/dashboard/DashboardOverview'
import { dashboardMetrics } from '../features/scenarios/config'
import { api } from '../services/api'
import type { DashboardTask } from '../types'

export function DashboardPage() {
  const [tasks, setTasks] = useState<DashboardTask[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api
      .listTasks()
      .then(({ data }) => {
        setTasks(
          data.map((task) => ({
            id: task.id,
            title: task.title,
            status: task.status,
            owner: task.created_by ?? 'GigHub operator',
            updatedAt: 'Just now',
          })),
        )
      })
      .catch((err: Error) => setError(err.message))
  }, [])

  return (
    <main className="page-shell">
      {error ? <div className="panel"><p>API unavailable, showing empty dashboard. {error}</p></div> : null}
      <DashboardOverview metrics={dashboardMetrics} tasks={tasks} />
    </main>
  )
}
