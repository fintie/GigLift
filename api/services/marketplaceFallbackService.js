export class MarketplaceFallbackService {
  constructor({ marketplaceJobModel }) {
    this.marketplaceJobModel = marketplaceJobModel
  }

  createJobFromTask(task, reason = 'Human help requested') {
    const category = task.scenario_type === 'home-repairs'
      ? 'Repairs'
      : task.scenario_type === 'rental-support'
        ? 'Rental support'
        : task.scenario_type === 'home-care'
          ? 'Care support'
          : 'Moving and cleaning'

    const location = task.input_data?.suburb ?? task.input_data?.location ?? task.input_data?.propertyAddress ?? 'Sydney'

    return this.marketplaceJobModel.create({
      linkedTaskId: task.id,
      title: task.title,
      category,
      location,
      budget: task.scenario_type === 'home-care' ? '$55/hr' : '$120 - $450',
      eta: task.scenario_type === 'home-repairs' ? '2 quotes within 1 hour' : 'Responses within the day',
      status: 'posted_to_marketplace',
      reason,
      bids: task.scenario_type === 'rental-support' ? 0 : 2,
    })
  }
}
