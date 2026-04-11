import { AiExecutionService } from './aiExecutionService.js'
import { AgentRouterService } from './agentRouterService.js'
import { MarketplaceFallbackService } from './marketplaceFallbackService.js'
import { TaskService } from './taskService.js'

export function createServices(models) {
  const agentRouterService = new AgentRouterService()
  const aiExecutionService = new AiExecutionService({
    agentRouterService,
    taskExecutionsModel: models.taskExecutions,
  })
  const marketplaceFallbackService = new MarketplaceFallbackService({
    marketplaceJobsModel: models.marketplaceJobs,
  })

  return {
    agentRouterService,
    aiExecutionService,
    marketplaceFallbackService,
    taskService: new TaskService({
      tasksModel: models.tasks,
      aiExecutionService,
      marketplaceFallbackService,
    }),
  }
}
