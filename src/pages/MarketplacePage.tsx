import { useEffect, useState } from 'react'
import { MarketplacePanel } from '../features/marketplace/MarketplacePanel'
import { marketplaceJobs } from '../features/scenarios/config'
import { api } from '../services/api'
import type { MarketplaceJob } from '../types'

export function MarketplacePage() {
  const [jobs, setJobs] = useState<MarketplaceJob[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    api.getMarketplaceJobs()
      .then((response) => {
        const nextJobs = Array.isArray(response.data) ? response.data : []

        if (nextJobs.length > 0) {
          setJobs(nextJobs)
          return
        }

        setJobs(marketplaceJobs)
        setUsingFallback(true)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load marketplace jobs')
        setJobs(marketplaceJobs)
        setUsingFallback(true)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="page-shell">
      {loading ? <p className="info-text">Loading human fallback jobs...</p> : null}
      {!loading ? <MarketplacePanel jobs={jobs} usingFallback={usingFallback} error={error} /> : null}
    </main>
  )
}
