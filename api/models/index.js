import { MarketplaceJobModel } from './marketplaceJobModel.js'
import { TaskExecutionModel } from './taskExecutionModel.js'
import { TaskModel } from './taskModel.js'

export function createModels(store) {
  return {
    tasks: new TaskModel(store),
    taskExecutions: new TaskExecutionModel(store),
    marketplaceJobs: new MarketplaceJobModel(store),
  }
}
