export class MarketplaceJobModel {
  constructor(store) {
    this.store = store
  }

  create(payload) {
    const job = {
      id: `job_${Date.now()}`,
      linked_task_id: payload.linked_task_id,
      title: payload.title,
      segment: payload.segment,
      budget: payload.budget ?? '$50',
      status: payload.status ?? 'posted_to_marketplace',
      assigned_human_id: payload.assigned_human_id ?? null,
      bids_count: payload.bids_count ?? 0,
      reason: payload.reason ?? 'AI fallback requested',
      created_at: new Date().toISOString(),
    }

    this.store.marketplaceJobs.push(job)
    return job
  }

  list() {
    return this.store.marketplaceJobs
  }
}
