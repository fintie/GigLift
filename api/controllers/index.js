import { MarketplaceController } from './marketplaceController.js'
import { TaskController } from './taskController.js'

export function createControllers({ services, models }) {
  return {
    taskController: new TaskController({ taskService: services.taskService }),
    marketplaceController: new MarketplaceController({ marketplaceJobsModel: models.marketplaceJobs }),
  }
}
