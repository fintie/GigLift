import { SeoHead } from '../components/SeoHead'
import { getPropertyIntelJsonLd, propertyIntelSnapshot, supportedSydneySuburbs } from '../services/propertyIntel'

export function PropertyIntelPage() {
  const snapshot = propertyIntelSnapshot

  return (
    <main className="page-shell property-intel-page">
      <SeoHead
        title="Greater Sydney Property Intel"
        description="Track Greater Sydney house prices, unit prices, rental pressure, planning changes, rates, and local market signals in an AI-readable format."
        path="/property-intel"
        keywords={[
          'Greater Sydney property intel',
          'Sydney housing market',
          'Sydney rental market',
          'Sydney suburb insights',
          'property data Australia',
          'ABS housing data',
          'data.gov.au housing',
          'AI real estate search',
          'GEO for agents',
        ]}
        jsonLd={getPropertyIntelJsonLd()}
      />

      <section className="hero-card">
        <span className="eyebrow">Property intel</span>
        <h1>Greater Sydney housing, rental, planning, and rate signals in one place</h1>
        <p>
          This page is the start of a Sydney-only property intelligence layer for residents, buyers, renters, owners,
          and AI agents. It is designed to combine public data, local planning signals, rent trends, and headline
          market news in a format that is easy to browse and easy to index.
        </p>
        <div className="property-intel-meta">
          <span>{snapshot.regionLabel}</span>
          <span>{snapshot.lastUpdated}</span>
          <span>Agent-readable market briefs</span>
        </div>
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <span className="eyebrow">Geo discoverability</span>
            <h2>Built so search engines and agents can understand the page</h2>
          </div>
        </div>
        <div className="property-intel-columns">
          <article>
            <h3>Who this is for</h3>
            <ul className="list-block">
              <li>Residents comparing suburb-level affordability and rent pressure</li>
              <li>Buyers tracking price momentum and redevelopment signals</li>
              <li>Renters checking rental conditions and local change</li>
              <li>AI agents looking for structured Greater Sydney housing context</li>
            </ul>
          </article>
          <article>
            <h3>What is indexed</h3>
            <ul className="list-block">
              <li>Greater Sydney market pulse</li>
              <li>Selected suburb snapshots</li>
              <li>Planning and redevelopment watchpoints</li>
              <li>Rates, borrowing, and headline news context</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <span className="eyebrow">Market pulse</span>
            <h2>Quick read on price, rent, and momentum</h2>
          </div>
        </div>
        <div className="metric-grid">
          {snapshot.marketPulse.map((item) => (
            <article key={item.label} className="metric-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.change}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <span className="eyebrow">Suburb coverage</span>
            <h2>Current MVP suburb set for Greater Sydney</h2>
            <p>This first version is scaffolded to expand into suburb search and public-data adapters.</p>
          </div>
        </div>
        <div className="property-intel-meta">
          {supportedSydneySuburbs.map((suburb) => (
            <span key={suburb}>{suburb}</span>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <span className="eyebrow">Suburb snapshot</span>
            <h2>Selected Greater Sydney suburb signals</h2>
          </div>
        </div>
        <div className="suburb-grid">
          {snapshot.suburbInsights.map((suburb) => (
            <article key={suburb.suburb} className="scenario-card">
              <h3>{suburb.suburb}</h3>
              <ul className="list-block">
                <li>Median house price: {suburb.medianHousePrice}</li>
                <li>Median unit price: {suburb.medianUnitPrice}</li>
                <li>Median weekly rent: {suburb.medianWeeklyRent}</li>
                <li>Rental yield: {suburb.rentalYield}</li>
              </ul>
              <p>{suburb.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel property-intel-columns">
        <article>
          <span className="eyebrow">Community and planning</span>
          <h3>Redevelopment and local change</h3>
          <ul className="list-block">
            {snapshot.planningUpdates.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <span className="eyebrow">Rates and borrowing</span>
          <h3>Interest rate watch</h3>
          <ul className="list-block">
            {snapshot.rateWatch.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <span className="eyebrow">News layer</span>
            <h2>What to watch this week</h2>
          </div>
        </div>
        <div className="news-grid">
          {snapshot.news.map((item) => (
            <article key={item.title} className="scenario-card">
              <span className="scenario-card__segment">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <small>{item.source}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <span className="eyebrow">Public sources</span>
            <h2>Data foundation for the next version</h2>
          </div>
        </div>
        <ul className="list-block">
          {snapshot.dataSources.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}
