import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { TaskResultPanel } from '../features/tasks/TaskResultPanel'
import { api } from '../services/api'
import { toTaskResult } from '../services/taskAdapters'
import type { ApiTask, MarketplaceJob, TaskResult } from '../types'

interface LocationState {
  result?: TaskResult
}

export function TaskDetailPage() {
  const { taskId } = useParams<{ taskId: string }>()
  const location = useLocation()
  const locationState = location.state as LocationState | null
  const [task, setTask] = useState<ApiTask | null>(null)
  const [result, setResult] = useState<TaskResult | null>(locationState?.result ?? null)
  const [fallbackJob, setFallbackJob] = useState<MarketplaceJob | null>(null)
  const [loading, setLoading] = useState(!locationState?.result)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!taskId) return

    setLoading(true)
    api.getTask(taskId)
      .then((response) => {
        setTask(response.data)
        setResult(toTaskResult(response.data))
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load task'))
      .finally(() => setLoading(false))
  }, [taskId])

  const handleRunTask = async () => {
    if (!taskId) return
    setActionLoading(true)
    setError(null)
    try {
      const response = await api.runTask(taskId)
      setTask(response.data.task)
      setFallbackJob(response.data.fallbackJob ?? null)
      setResult(toTaskResult(response.data.task, response.data.fallbackJob ?? null))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run task')
    } finally {
      setActionLoading(false)
    }
  }

  const handleSendToHuman = async () => {
    if (!taskId) return
    setActionLoading(true)
    setError(null)
    try {
      const response = await api.sendTaskToHuman(taskId, 'Resident requested local human support in Greater Sydney')
      setTask(response.data.task)
      setFallbackJob(response.data.fallbackJob ?? null)
      setResult(toTaskResult(response.data.task, response.data.fallbackJob ?? null))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send task to human help')
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <main className="page-shell">
      <section className="panel">
        <div className="panel__header">
          <div>
            <span className="eyebrow">Task detail</span>
            <h2>{task?.title ?? result?.title ?? 'Resident task output'}</h2>
            <p>Review the structured output, re-run the AI path, or escalate to local human help when needed.</p>
          </div>
          <div className="task-detail-actions">
            <button className="secondary-button" type="button" onClick={handleRunTask} disabled={actionLoading || loading}>
              {actionLoading ? 'Working...' : 'Run AI'}
            </button>
            <button className="primary-button" type="button" onClick={handleSendToHuman} disabled={actionLoading || loading}>
              Request human help
            </button>
          </div>
        </div>
        {task ? (
          <div className="task-detail-meta">
            <span>Status: {task.status}</span>
            <span>Mode: {task.mode}</span>
            <span>Scenario: {task.scenario_type}</span>
            <span>Updated: {task.updated_at ?? 'Recently'}</span>
          </div>
        ) : null}
        {fallbackJob ? (
          <div className="info-banner">
            Human fallback created: {fallbackJob.title} ({fallbackJob.budget})
          </div>
        ) : null}
        {loading ? <p className="info-text">Loading task...</p> : null}
        {error ? <p className="error-text">{error}</p> : null}
      </section>

      {!loading ? <TaskResultPanel result={result} /> : null}
    </main>
  )
}
