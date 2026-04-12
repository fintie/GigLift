import { useLocation, useParams } from 'react-router-dom'
import { TaskResultPanel } from '../features/tasks/TaskResultPanel'
import type { TaskResult } from '../types'

export function TaskDetailPage() {
  const { taskId } = useParams()
  const location = useLocation()
  const state = location.state as { result?: TaskResult } | null

  return (
    <main className="page-shell">
      <div className="panel">
        <div className="panel__header">
          <div>
            <span className="eyebrow">Task detail</span>
            <h2>{taskId}</h2>
          </div>
        </div>
      </div>
      <TaskResultPanel result={state?.result ?? null} />
    </main>
  )
}
