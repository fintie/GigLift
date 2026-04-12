import { propertyIntelSnapshot } from '../services/propertyIntel'

export function PropertyIntelPage() {
  const snapshot = propertyIntelSnapshot

  return (
    <main className="page-shell property-intel-page">
      <section className="hero-card">
        <span className="eyebrow">Property intel</span>
        <h1>Greater Sydney housing, rental, planning, and rate signals in one place</h1>
        <p>
          This page is the start of a Sydney-only property intelligence layer for residents, buyers, renters, and owners.
          It is designed to combine public data, local planning signals, rent trends, and headline market news in a format
          that both people and AI agents can use.
        </p>
        <div className="property-intel-meta">
          <span>{snapshot.regionLabel}</span>
          <span>{snapshot.lastUpdated}</span>
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
