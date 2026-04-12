import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { TaskResultPanel } from '../features/tasks/TaskResultPanel'
import { api } from '../services/api'
import { toTaskResult } from '../services/taskAdapters'
import type { ApiTask, TaskResult } from '../types'

interface LocationState {
  result?: TaskResult
}

export function TaskDetailPage() {
  const { taskId } = useParams<{ taskId: string }>()
  const location = useLocation()
  const locationState = location.state as LocationState | null
  const [result, setResult] = useState<TaskResult | null>(locationState?.result ?? null)
  const [task, setTask] = useState<ApiTask | null>(null)
  const [loading, setLoading] = useState(!locationState?.result)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!taskId || locationState?.result) return

    api.getTask(taskId)
      .then((response) => {
        setTask(response.data)
        setResult(toTaskResult(response.data))
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load task'))
      .finally(() => setLoading(false))
  }, [taskId, locationState?.result])

  return (
    <main className="page-shell">
      <section className="panel">
        <div className="panel__header">
          <div>
            <span className="eyebrow">Task detail</span>
            <h2>{task?.title ?? result?.title ?? 'Resident task output'}</h2>
            <p>Review the structured output, then decide whether to approve, send, or escalate.</p>
          </div>
        </div>
        {loading ? <p className="info-text">Loading task...</p> : null}
        {error ? <p className="error-text">{error}</p> : null}
      </section>

      {!loading ? <TaskResultPanel result={result} /> : null}
    </main>
  )
}
