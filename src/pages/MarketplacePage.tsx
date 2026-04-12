import { useEffect, useState } from 'react'
import { MarketplacePanel } from '../features/marketplace/MarketplacePanel'
import { marketplaceJobs as fallbackJobs } from '../features/scenarios/config'
import { api } from '../services/api'
import type { MarketplaceJob } from '../types'

export function MarketplacePage() {
  const [jobs, setJobs] = useState<MarketplaceJob[]>(fallbackJobs)

  useEffect(() => {
    api
      .listMarketplaceJobs()
      .then(({ data }) => {
        if (data.length > 0) {
          setJobs(data)
        }
      })
      .catch(() => undefined)
  }, [])

  return (
    <main className="page-shell">
      <MarketplacePanel jobs={jobs} />
    </main>
  )
}
