export class TaskExecutionModel {
  constructor(store) {
    this.store = store
  }

  create(payload) {
    const now = new Date().toISOString()

    const execution = {
      id: `exec_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      task_id: payload.task_id,
      execution_mode: payload.execution_mode,
      confidence_score: payload.confidence_score ?? null,
      quality_score: payload.quality_score ?? null,
      status: payload.status ?? 'completed',
      agents_used: payload.agents_used ?? [],
      output: payload.output ?? null,
      created_at: now,
      completed_at: payload.completed_at ?? now,
    }

    this.store.executions.push(execution)
    return execution
  }

  listByTask(taskId) {
    return this.store.executions.filter((execution) => execution.task_id === taskId)
  }
}
