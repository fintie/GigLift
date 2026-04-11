function validateTaskPayload(body) {
  if (!body.title || !body.scenario_type || !body.input_data) {
    return 'title, scenario_type, and input_data are required'
  }
  return null
}

export class TaskController {
  constructor({ taskService }) {
    this.taskService = taskService
  }

  createTask = (req, res) => {
    const error = validateTaskPayload(req.body)
    if (error) {
      return res.status(400).json({ error })
    }

    const task = this.taskService.createTask(req.body)
    return res.status(201).json({ data: task })
  }

  runTask = (req, res) => {
    const result = this.taskService.runTask(req.params.taskId)
    if (!result) {
      return res.status(404).json({ error: 'Task not found' })
    }
    return res.json({ data: result })
  }

  sendToHuman = (req, res) => {
    const result = this.taskService.sendToHuman(req.params.taskId, req.body?.reason)
    if (!result) {
      return res.status(404).json({ error: 'Task not found' })
    }
    return res.json({ data: result })
  }

  listTasks = (_req, res) => {
    return res.json({ data: this.taskService.listTasks() })
  }
}
