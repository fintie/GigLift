import { useEffect, useState } from 'react'
import { MarketplacePanel } from '../features/marketplace/MarketplacePanel'
import { api } from '../services/api'
import type { MarketplaceJob } from '../types'

export function MarketplacePage() {
  const [jobs, setJobs] = useState<MarketplaceJob[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.getMarketplaceJobs()
      .then((response) => setJobs(response.data))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load fallback jobs'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="page-shell">
      {loading ? <p className="info-text">Loading human fallback jobs...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
      {!loading ? <MarketplacePanel jobs={jobs} /> : null}
    </main>
  )
}
