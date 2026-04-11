export const TASK_STATES = [
  'draft',
  'running_ai',
  'ai_completed',
  'needs_human',
  'posted_to_marketplace',
  'assigned_to_human',
  'completed',
]

export class TaskModel {
  constructor(store) {
    this.store = store
  }

  create(payload) {
    const task = {
      id: `task_${Date.now()}`,
      title: payload.title,
      description: payload.description,
      scenario_type: payload.scenario_type,
      input_data: payload.input_data,
      created_by: payload.created_by ?? 'system_demo',
      status: payload.status ?? 'draft',
      mode: payload.mode ?? 'AI',
      ai_confidence_score: payload.ai_confidence_score ?? null,
      requires_human: payload.requires_human ?? false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    this.store.tasks.push(task)
    return task
  }

  update(id, patch) {
    const task = this.findById(id)
    if (!task) return null

    Object.assign(task, patch, { updated_at: new Date().toISOString() })
    return task
  }

  findById(id) {
    return this.store.tasks.find((task) => task.id === id) ?? null
  }

  list() {
    return this.store.tasks
  }
}
