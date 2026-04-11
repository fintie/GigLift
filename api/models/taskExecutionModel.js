export class TaskExecutionModel {
  constructor(store) {
    this.store = store
  }

  create(payload) {
    const execution = {
      id: `exec_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      task_id: payload.task_id,
      execution_mode: payload.execution_mode,
      executor_id: payload.executor_id,
      logs: payload.logs ?? [],
      output: payload.output ?? null,
      quality_score: payload.quality_score ?? null,
      started_at: payload.started_at ?? new Date().toISOString(),
      completed_at: payload.completed_at ?? null,
    }

    this.store.executions.push(execution)
    return execution
  }

  listByTask(taskId) {
    return this.store.executions.filter((execution) => execution.task_id === taskId)
  }
}
