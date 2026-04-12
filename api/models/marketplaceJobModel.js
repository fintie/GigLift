export class MarketplaceJobModel {
  constructor(store) {
    this.store = store
  }

  create(payload) {
    const job = {
      id: `job_${Date.now()}`,
      linkedTaskId: payload.linkedTaskId ?? payload.linked_task_id,
      title: payload.title,
      category: payload.category ?? payload.segment,
      segment: payload.segment ?? payload.category,
      location: payload.location ?? 'Greater Sydney',
      budget: payload.budget ?? '$50',
      eta: payload.eta ?? 'TBC',
      status: payload.status ?? 'posted_to_marketplace',
      assigned_human_id: payload.assigned_human_id ?? null,
      bids: payload.bids ?? payload.bids_count ?? 0,
      bids_count: payload.bids_count ?? payload.bids ?? 0,
      reason: payload.reason ?? 'AI fallback requested',
      created_at: new Date().toISOString(),
    }

    this.store.marketplaceJobs.push(job)
    return job
  }

  list() {
    return [...this.store.marketplaceJobs].sort((a, b) => b.created_at.localeCompare(a.created_at))
  }
}
