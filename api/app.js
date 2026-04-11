import express from 'express'
import { createControllers } from './controllers/index.js'
import { createModels } from './models/index.js'
import { createServices } from './services/index.js'

export function createApp() {
  const app = express()
  app.use(express.json())

  const store = {
    tasks: [],
    executions: [],
    marketplaceJobs: [],
  }

  const models = createModels(store)
  const services = createServices(models)
  const controllers = createControllers({ services, models })

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'gighub-api' })
  })

  app.get('/api/tasks', controllers.taskController.listTasks)
  app.post('/api/tasks', controllers.taskController.createTask)
  app.post('/api/tasks/:taskId/run', controllers.taskController.runTask)
  app.post('/api/tasks/:taskId/human-fallback', controllers.taskController.sendToHuman)

  app.get('/api/marketplace/jobs', controllers.marketplaceController.listJobs)

  return app
}
