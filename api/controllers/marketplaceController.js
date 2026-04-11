export class MarketplaceController {
  constructor({ marketplaceJobsModel }) {
    this.marketplaceJobsModel = marketplaceJobsModel
  }

  listJobs = (_req, res) => {
    return res.json({ data: this.marketplaceJobsModel.list() })
  }
}
