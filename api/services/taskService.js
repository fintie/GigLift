export class TaskService {
  constructor({ tasksModel, aiExecutionService, marketplaceFallbackService }) {
    this.tasksModel = tasksModel
    this.aiExecutionService = aiExecutionService
    this.marketplaceFallbackService = marketplaceFallbackService
  }

  createTask(payload) {
    return this.tasksModel.create({
      title: payload.title,
      description: payload.description,
      scenario_type: payload.scenario_type,
      input_data: payload.input_data,
      created_by: payload.created_by,
      mode: payload.mode ?? 'AI',
      status: 'draft',
      requires_human: payload.mode === 'HUMAN',
    })
  }

  runTask(taskId) {
    const task = this.tasksModel.findById(taskId)
    if (!task) {
      return null
    }

    this.tasksModel.update(task.id, { status: 'running_ai' })
    const result = this.aiExecutionService.execute(task)

    const updatedTask = this.tasksModel.update(task.id, {
      status: result.requiresHuman ? 'needs_human' : 'ai_completed',
      ai_confidence_score: result.confidence,
      requires_human: result.requiresHuman,
    })

    let fallbackJob = null
    if (result.requiresHuman) {
      fallbackJob = this.marketplaceFallbackService.createFallbackJob(
        updatedTask,
        result.confidence < result.route.threshold ? 'AI confidence below threshold' : 'Human mode requested'
      )
      this.tasksModel.update(task.id, { status: 'posted_to_marketplace' })
    }

    return {
      task: this.tasksModel.findById(task.id),
      execution: result.execution,
      route: result.route,
      output: result.output,
      quality: result.quality,
      fallbackJob,
    }
  }

  sendToHuman(taskId, reason = 'User requested human fallback') {
    const task = this.tasksModel.findById(taskId)
    if (!task) return null

    this.tasksModel.update(task.id, {
      status: 'needs_human',
      requires_human: true,
    })

    const fallbackJob = this.marketplaceFallbackService.createFallbackJob(task, reason)
    const updatedTask = this.tasksModel.update(task.id, { status: 'posted_to_marketplace' })

    return { task: updatedTask, fallbackJob }
  }

  listTasks() {
    return this.tasksModel.list()
  }
}
