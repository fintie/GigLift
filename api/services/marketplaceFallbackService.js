export class MarketplaceFallbackService {
  constructor({ marketplaceJobsModel }) {
    this.marketplaceJobsModel = marketplaceJobsModel
  }

  createFallbackJob(task, reason) {
    return this.marketplaceJobsModel.create({
      linked_task_id: task.id,
      title: task.title,
      segment: task.scenario_type,
      budget: '$75',
      status: 'posted_to_marketplace',
      reason,
      bids_count: 0,
    })
  }
}
