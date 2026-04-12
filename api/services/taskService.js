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

  getTask(taskId) {
    return this.tasksModel.findById(taskId)
  }

  async runTask(taskId) {
    const task = this.tasksModel.findById(taskId)
    if (!task) {
      return null
    }

    this.tasksModel.update(task.id, { status: 'running_ai' })
    const result = await this.aiExecutionService.execute(this.tasksModel.findById(task.id))

    const updatedTask = this.tasksModel.update(task.id, {
      status: result.shouldEscalate ? 'needs_human' : 'ai_completed',
      ai_confidence_score: result.execution.confidence_score,
      requires_human: result.shouldEscalate,
    })

    let fallbackJob = null
    if (result.shouldEscalate && updatedTask) {
      fallbackJob = this.marketplaceFallbackService.createJobFromTask(
        updatedTask,
        'AI confidence below threshold for resident-safe completion',
      )
      this.tasksModel.update(task.id, { status: 'posted_to_marketplace' })
    }

    return {
      task: this.tasksModel.findById(task.id),
      execution: result.execution,
      route: result.route,
      output: result.execution.output,
      quality: result.execution.quality_score,
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

    const fallbackJob = this.marketplaceFallbackService.createJobFromTask(this.tasksModel.findById(task.id), reason)
    const updatedTask = this.tasksModel.update(task.id, { status: 'posted_to_marketplace' })

    return { task: updatedTask, fallbackJob }
  }

  listTasks() {
    return this.tasksModel.list()
  }
}
